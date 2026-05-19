const fs = require("fs");
const path = require("path");
const argv = require("yargs").argv;
const plist = require("plist");

const {
  name: appName,
  oldName: oldAppName,
  iconIos: iconIos,
  iconAndroid: iconAndroid,
  logo: logo,
  banner: banner,
  primary: primary,
  secondary: secondary,
  secondaryTransprent: secondaryTransprent,
  url: url,
  authKey: authKey,
  package: newPackage,
  oldPackage: oldPackage,
} = argv;

const rootDir = __dirname;
const iosPath = path.join(rootDir, "ios");
const androidPath = path.join(rootDir, "android");
const oldAppFolderPath = path.join(iosPath, oldAppName);
const newAppFolderPath = path.join(iosPath, appName);
const androidResPath = path.join(androidPath, "app", "src", "main", "res");

// Validate args
if (
  !appName ||
  !oldAppName ||
  !iconIos ||
  !iconAndroid ||
  !logo ||
  !banner ||
  !primary ||
  !secondary ||
  !secondaryTransprent ||
  !url ||
  !authKey ||
  !newPackage ||
  !oldPackage
) {
  console.error(
    "Missing arguments.\nUsage:\n--name --oldName --iconIos --iconAndroid --logo --banner --primary --secondary --url --package"
  );
  // process.exit(1);
}

// Add replacements used for .xcscheme and other iOS files
const replacements = {
  [oldAppName]: appName,
  [`${oldAppName}.app`]: `${appName}.app`,
  [`${oldAppName}Tests`]: `${appName}Tests`,
  [`${oldAppName}.xcodeproj`]: `${appName}.xcodeproj`,
};

// app.json & package.json
const updateJSON = (filePath, updateFn) => {
  const json = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  updateFn(json);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
};
updateJSON(path.join(__dirname, "app.json"), (json) => {
  json.name = appName;
  json.displayName = appName;
});
updateJSON(path.join(__dirname, "package.json"), (json) => {
  json.name = appName;
});
updateJSON(path.join(__dirname, "app/i18n/en.json"), (json) => {
  json.AppDrawer.appName = appName;
  json.AppDrawer.logOutAlert = `Do you want to logout from ${appName} app ?`;
});

// color.ts
if (primary && secondary) {
  const themePath = path.join(__dirname, "app/theme/color.ts");
  let themeContent = fs.readFileSync(themePath, "utf-8");
  themeContent = themeContent
    .replace(/primary: '.*?'/, `primary: '${primary}'`)
    .replace(/secondary: '.*?'/, `secondary: '${secondary}'`)
    .replace(
      /secondaryTransprent: '.*?'/,
      `secondaryTransprent: '${secondaryTransprent}'`
    );
  fs.writeFileSync(themePath, themeContent);
}

// env
if (url) {
  const jsFilePath = path.join(__dirname, "app", "config", "env.js");
  if (!fs.existsSync(jsFilePath)) {
    process.exit(1);
  }

  const lines = fs.readFileSync(jsFilePath, "utf8").split("\n");

  const updated = lines.map((line) => {
    if (/^\s*export\s+const\s+API_URL\s*=/.test(line)) {
      return line.replace(/(['"])(.*?)\1/, `'${url}'`);
    }
    if (/^\s*export\s+const\s+authkey\s*=/.test(line)) {
      return line.replace(/(['"])(.*?)\1/, `'${authKey}'`);
    }

    return line;
  });

  fs.writeFileSync(jsFilePath, updated.join("\n"), "utf8");

  // update url into production, sandbox & dev
  const envProdPath = path.join(__dirname, ".env.production");
  const envDevPath = path.join(__dirname, ".env.dev");
  const envSandPath = path.join(__dirname, ".env.sandbox");

  // Read existing contents
  let contents1 = fs.readFileSync(envProdPath, "utf8");
  let contents2 = fs.readFileSync(envDevPath, "utf8");
  let contents3 = fs.readFileSync(envSandPath, "utf8");

  const newLine = `API_URL=${url}`;
  const authKeys = `API_KEY=${authKey}`;

  if (/^API_URL=/m.test(contents1)) {
    contents1 = contents1
      .replace(/^API_URL=.*$/m, newLine)
      .replace(/^API_KEY=.*$/m, authKeys);
  }
  if (/^API_URL=/m.test(contents2)) {
    contents2 = contents2
      .replace(/^API_URL=.*$/m, newLine)
      .replace(/^API_KEY=.*$/m, authKeys);
  }
  if (/^API_URL=/m.test(contents3)) {
    contents3 = contents3
      .replace(/^API_URL=.*$/m, newLine)
      .replace(/^API_KEY=.*$/m, authKeys);
  } else {
    // None had API_URL, so append it to all three (ensuring a trailing newline)
    [contents1, contents2, contents3] = [contents1, contents2, contents3].map(
      (ct) => {
        if (!ct.endsWith("\n")) ct += "\n";
        return ct + newLine + "\n";
      }
    );
  }
  fs.writeFileSync(envProdPath, contents1, "utf8");
  fs.writeFileSync(envDevPath, contents2, "utf8");
  fs.writeFileSync(envSandPath, contents3, "utf8");
}

// Rename iOS folder
if (fs.existsSync(oldAppFolderPath)) {
  fs.renameSync(oldAppFolderPath, newAppFolderPath);
  console.log(`Renamed iOS folder: ${oldAppName} → ${appName}`);
}

// Info.plist
const infoPlistPath = path.join(newAppFolderPath, "Info.plist");
if (fs.existsSync(infoPlistPath)) {
  const info = plist.parse(fs.readFileSync(infoPlistPath, "utf-8"));
  info.CFBundleDisplayName = appName;
  info.CFBundleName = appName;
  info.CFBundleIdentifier = newPackage;
  fs.writeFileSync(infoPlistPath, plist.build(info), "utf-8");
  console.log(`Updated Info.plist`);
}
// GoogleService-Info.plist
const iosGoogleServicePlist = path.join(
  newAppFolderPath,
  "GoogleService-Info.plist"
);
if (fs.existsSync(iosGoogleServicePlist)) {
  let content = fs.readFileSync(iosGoogleServicePlist, "utf8");
  content = content.replace(
    /<key>BUNDLE_ID<\/key>\s*<string>.*?<\/string>/,
    `<key>BUNDLE_ID</key>\n\t<string>${newPackage}</string>`
  );
  fs.writeFileSync(iosGoogleServicePlist, content);
}

// google-services.json check
const googleServicesJsonPath = path.join(
  androidPath,
  "app",
  "google-services.json"
);

if (fs.existsSync(googleServicesJsonPath)) {
  const googleJson = JSON.parse(
    fs.readFileSync(googleServicesJsonPath, "utf-8")
  );

  if (googleJson.client && googleJson.client.length > 0) {
    googleJson.client.forEach((client) => {
      if (client.client_info && client.client_info.android_client_info) {
        client.client_info.android_client_info.package_name = newPackage;
      }
    });
    fs.writeFileSync(
      googleServicesJsonPath,
      JSON.stringify(googleJson, null, 2)
    );
  }
  if (googleJson.project_info) {
    googleJson.project_info.project_id = `${appName}-b3b3d`;
    googleJson.project_info.storage_bucket = `${appName}-b3b3d.firebasestorage.app`;
  }
  fs.writeFileSync(googleServicesJsonPath, JSON.stringify(googleJson, null, 2));
}

// strings.xml
const stringsXmlPath = path.join(androidResPath, "values", "strings.xml");
let stringsXml = fs.readFileSync(stringsXmlPath, "utf8");
stringsXml = stringsXml
  .replace(
    /<string name="app_name">.*?<\/string>/,
    `<string name="app_name">${appName}</string>`
  )
  .replace(
    /<string name="default_notification_channel_id">.*?<\/string>/,
    `<string name="default_notification_channel_id">${appName.toLowerCase()}</string>`
  );
fs.writeFileSync(stringsXmlPath, stringsXml);

// Java package rename
const javaBasePath = path.join(androidPath, "app/src/main/java");
const findJavaFiles = (dir) => {
  const files = {};
  const walk = (d) => {
    fs.readdirSync(d).forEach((file) => {
      const full = path.join(d, file);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (file === "MainActivity.java" || file === "MainApplication.java")
        files[file] = full;
    });
  };
  walk(javaBasePath);
  return files;
};

Object.values(findJavaFiles(javaBasePath)).forEach((filePath) => {
  let content = fs.readFileSync(filePath, "utf8");
  content = content.replace(/^package .*?;/m, `package ${newPackage};`);
  fs.writeFileSync(filePath, content);
});

// Update getMainComponentName() in MainActivity.java
Object.values(findJavaFiles(javaBasePath)).forEach((filePath) => {
  if (filePath.includes("MainActivity.java")) {
    let content = fs.readFileSync(filePath, "utf8");

    // Replace the return value in getMainComponentName()
    content = content.replace(/return\s+"[^"]+";/, `return "${appName}";`);

    fs.writeFileSync(filePath, content, "utf8");
    console.log(
      ` Updated getMainComponentName() to "${appName}" in MainActivity.java`
    );
  }
});

// MainActivity title fix
const updateMainActivityAppName = () => {
  const walk = (dir) => {
    fs.readdirSync(dir).forEach((file) => {
      const full = path.join(dir, file);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (file === "MainActivity.java") {
        let content = fs.readFileSync(full, "utf8");
        content = content.replace(
          /getString\(R.string.app_name\)/g,
          `"${appName}"`
        );
        fs.writeFileSync(full, content);
        console.log("Updated app name in MainActivity.java");
      }
    });
  };
  walk(javaBasePath);
};
updateMainActivityAppName();

// AndroidManifest and Gradle
const manifestPath = path.join(androidPath, "app/src/main/AndroidManifest.xml");
let manifestContent = fs.readFileSync(manifestPath, "utf8");
manifestContent = manifestContent.replace(
  /package=".*?"/,
  `package="${newPackage}"`
);
fs.writeFileSync(manifestPath, manifestContent);

const gradlePath = path.join(androidPath, "app/build.gradle");
let gradleContent = fs.readFileSync(gradlePath, "utf8");
gradleContent = gradleContent
  .replace(/applicationId ".*?"/, `applicationId "${newPackage}"`)
  .replace(/namespace ".*?"/, `namespace "${newPackage}"`);
fs.writeFileSync(gradlePath, gradleContent);

const settingGradle = path.join(androidPath, "settings.gradle");
let settingContent = fs.readFileSync(settingGradle, "utf8");
settingContent = settingContent.replace(
  /rootProject\.name\s*=\s*['"].*?['"]/,
  `rootProject.name = '${appName}'`
);
fs.writeFileSync(settingGradle, settingContent);

// Assets
const splashAssetsPath = path.join(__dirname, "assets/images/splash");
if (!fs.existsSync(splashAssetsPath))
  fs.mkdirSync(splashAssetsPath, { recursive: true });
const validateAndCopy = (src, destName) => {
  const dest = path.join(splashAssetsPath, destName);
  if (!fs.existsSync(src)) {
    console.error(` File not found: ${src}`);
    process.exit(1);
  }
  fs.copyFileSync(src, dest);
  console.log(`✔ Copied ${destName}`);
};
if (logo) validateAndCopy(logo, "AppLogo.png");
if (banner) validateAndCopy(banner, "splashBottomImage.png");

const oldProj = path.join(iosPath, `${oldAppName}.xcodeproj`);
const newProj = path.join(iosPath, `${appName}.xcodeproj`);
if (fs.existsSync(oldProj)) {
  fs.renameSync(oldProj, newProj);
}

const oldXCScheme = path.join(
  newProj,
  `xcshareddata/xcschemes/${oldAppName}.xcscheme`
);
const newXCScheme = path.join(
  newProj,
  `xcshareddata/xcschemes/${appName}.xcscheme`
);

if (fs.existsSync(oldXCScheme)) {
  fs.renameSync(oldXCScheme, newXCScheme);
  let content = fs.readFileSync(newXCScheme, "utf8");
  content = content.replaceAll(oldAppName, appName);
  fs.writeFileSync(newXCScheme, content);
}
// Xcode project and workspace

const oldWorkspace = path.join(iosPath, `${oldAppName}.xcworkspace`);
const newWorkspace = path.join(iosPath, `${appName}.xcworkspace`);
if (fs.existsSync(oldWorkspace)) {
  fs.renameSync(oldWorkspace, newWorkspace);
  console.log(`Renamed .xcworkspace`);
}
const workspaceData = path.join(newWorkspace, "contents.xcworkspacedata");
if (fs.existsSync(workspaceData)) {
  let content = fs.readFileSync(workspaceData, "utf8");
  content = content.replaceAll(oldAppName, appName);
  fs.writeFileSync(workspaceData, content);
  console.log(`Updated workspace references`);
}

// Update Info.plist (additionally handling raw plist if needed)
const infoPlistRawPath = path.join(newAppFolderPath, "Info.plist");
if (fs.existsSync(infoPlistRawPath)) {
  let rawPlist = fs.readFileSync(infoPlistRawPath, "utf8");
  rawPlist = rawPlist
    .replace(
      /<key>CFBundleDisplayName<\/key>\s*<string>.*?<\/string>/,
      `<key>CFBundleDisplayName</key>\n\t<string>${appName}</string>`
    )
    .replace(
      /<key>BGTaskSchedulerPermittedIdentifiers<\/key>\s*<array>\s*<string>.*?<\/string>/,
      `<key>BGTaskSchedulerPermittedIdentifiers</key>\n\t<array>\n\t\t<string>${newPackage}</string>`
    );

  fs.writeFileSync(infoPlistRawPath, rawPlist, "utf8");
}

// Tests
const oldTests = path.join(iosPath, `${oldAppName}Tests`);
const newTests = path.join(iosPath, `${appName}Tests`);
if (fs.existsSync(oldTests)) {
  fs.renameSync(oldTests, newTests);
  console.log(`Renamed Tests folder`);
}
const oldTestFile = path.join(newTests, `${oldAppName}Tests.m`);
const newTestFile = path.join(newTests, `${appName}Tests.m`);
if (fs.existsSync(oldTestFile)) {
  fs.renameSync(oldTestFile, newTestFile);
  console.log(`Renamed test file`);
  let content = fs.readFileSync(newTestFile, "utf8");
  content = content.replaceAll(oldAppName, appName);
  fs.writeFileSync(newTestFile, content);
  console.log(`Updated test file`);
}

// AppDelegate.m
const appDelegatePath = path.join(newAppFolderPath, "AppDelegate.m");
if (fs.existsSync(appDelegatePath)) {
  let content = fs.readFileSync(appDelegatePath, "utf8");
  content = content.replace(/moduleName:@"[^"]+"/, `moduleName:@"${appName}"`);
  fs.writeFileSync(appDelegatePath, content);
  console.log(` Updated AppDelegate.m`);
}

// pbxproj
const pbxprojPath = path.join(newProj, "project.pbxproj");
if (fs.existsSync(pbxprojPath)) {
  let content = fs.readFileSync(pbxprojPath, "utf8");
  content = content.replaceAll(oldAppName, appName);
  fs.writeFileSync(pbxprojPath, content);
  console.log(` Updated project.pbxproj`);
}

// xcscheme
const schemePath = path.join(iosPath, "xcshareddata", "xcschemes");
const oldScheme = path.join(schemePath, `${oldAppName}.xcscheme`);
const newScheme = path.join(schemePath, `${appName}.xcscheme`);
if (fs.existsSync(oldScheme)) {
  let content = fs.readFileSync(oldScheme, "utf8");
  Object.keys(replacements).forEach((k) => {
    content = content.replaceAll(k, replacements[k]);
  });
  fs.writeFileSync(oldScheme, content);
  fs.renameSync(oldScheme, newScheme);
  console.log(` Updated and renamed shared scheme`);
}

// Rename entitlements file
const entitlementsOldPath = path.join(
  iosPath,
  appName,
  `${oldAppName}.entitlements`
);
const entitlementsNewPath = path.join(
  iosPath,
  appName,
  `${appName}.entitlements`
);
if (fs.existsSync(entitlementsOldPath)) {
  fs.renameSync(entitlementsOldPath, entitlementsNewPath);
  console.log(` Renamed entitlements file to ${appName}.entitlements`);
}

// Update contents of entitlements file
if (fs.existsSync(entitlementsNewPath)) {
  let entitlementsContent = fs.readFileSync(entitlementsNewPath, "utf8");
  entitlementsContent = entitlementsContent
    .replaceAll(oldAppName, appName)
    .replaceAll(oldAppName.toLowerCase(), appName.toLowerCase());
  fs.writeFileSync(entitlementsNewPath, entitlementsContent, "utf8");
  console.log(` Updated content inside ${appName}.entitlements`);
}
// Update GoogleService-Info.plist
const iosGoogleInfoPlist = path.join(iosPath, "GoogleService-Info.plist");
if (fs.existsSync(iosGoogleInfoPlist)) {
  let content = fs.readFileSync(iosGoogleInfoPlist, "utf8");
  content = content.replace(
    /<key>BUNDLE_ID<\/key>\s*<string>.*?<\/string>/,
    `<key>BUNDLE_ID</key>\n\t<string>${newPackage}</string>`
  );
  content = content.replace(
    /<key>PROJECT_ID<\/key>\s*<string>.*?<\/string>/,
    `<key>PROJECT_ID</key>\n\t<string>${appName}-b3b3d</string>`
  );
  content = content.replace(
    /<key>STORAGE_BUCKET<\/key>\s*<string>.*?<\/string>/,
    `<key>STORAGE_BUCKET</key>\n\t<string>${appName}-b3b3d.firebasestorage.app</string>`
  );
  fs.writeFileSync(iosGoogleInfoPlist, content, "utf8");
  console.log(` Updated BUNDLE_ID in ios/GoogleService-Info.plist`);
}
if (iconIos) {
  // iOS icon
  const iosSourceIconPath = "AppIcon/AppIcon.appiconset";
  const iosTargetAppIcon = path.join(
    iosPath,
    appName,
    "Images.xcassets",
    "AppIcon.appiconset"
  );

  if (fs.existsSync(iosSourceIconPath)) {
    if (!fs.existsSync(iosTargetAppIcon)) {
      fs.mkdirSync(iosTargetAppIcon, { recursive: true });
    }

    // Remove old files
    fs.readdirSync(iosTargetAppIcon).forEach((file) => {
      fs.unlinkSync(path.join(iosTargetAppIcon, file));
    });

    // Copy all files from source
    fs.readdirSync(iosSourceIconPath).forEach((file) => {
      const src = path.join(iosSourceIconPath, file);
      const dest = path.join(iosTargetAppIcon, file);
      fs.copyFileSync(src, dest);
    });

    console.log(" iOS AppIcon.appiconset replaced successfully");
  } else {
    console.error(` Source icon path not found: ${iosSourceIconPath}`);
  }
}

const launchScreenPath = path.join(iosPath, appName, "LaunchScreen.storyboard");
if (fs.existsSync(launchScreenPath)) {
  let xml = fs.readFileSync(launchScreenPath, "utf8");
  const regex = new RegExp(`text="[^"]*${oldAppName}[^"]*"`, "g");
  xml = xml.replace(regex, `text="${appName}"`);
  fs.writeFileSync(launchScreenPath, xml, "utf8");
}

if (fs.existsSync(infoPlistPath)) {
  let raw = fs.readFileSync(infoPlistPath, "utf8");
  const usageRegex = new RegExp(
    `(<string>)([^<]*?)${oldAppName}([^<]*?)(</string>)`,
    "g"
  );
  raw = raw.replace(usageRegex, (_match, p1, before, after, p4) => {
    return `${p1}${before}${appName}${after}${p4}`;
  });
  fs.writeFileSync(infoPlistPath, raw, "utf8");
}

//Update target names in ios/Podfile
const podfilePath = path.join(iosPath, "Podfile");
if (fs.existsSync(podfilePath)) {
  let podfile = fs.readFileSync(podfilePath, "utf8");

  podfile = podfile.replace(
    new RegExp(`target ['"]${oldAppName}['"]`, "g"),
    `target '${appName}'`
  );

  podfile = podfile.replace(
    new RegExp(`target ['"]${oldAppName}Tests['"]`, "g"),
    `target '${appName}Tests'`
  );

  fs.writeFileSync(podfilePath, podfile, "utf8");
}
if (iconAndroid) {
  // Android icons
  // Android Icon Replacement (Updated to include foreground icon too)
  const mipmapDirs = [
    "mipmap-mdpi",
    "mipmap-hdpi",
    "mipmap-xhdpi",
    "mipmap-xxhdpi",
    "mipmap-xxxhdpi",
  ];

  mipmapDirs.forEach((dir) => {
    const sourceDir = path.join(iconAndroid, dir);
    const targetDir = path.join(androidResPath, dir);
    if (fs.existsSync(sourceDir) && fs.existsSync(targetDir)) {
      [
        "ic_launcher.png",
        "ic_launcher_round.png",
        "ic_launcher_foreground.png",
      ].forEach((file) => {
        const srcFile = path.join(sourceDir, file);
        const destFile = path.join(targetDir, file);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, destFile);
          console.log(` Replaced ${file} in ${dir}`);
        } else {
          console.warn(` Skipped ${file} in ${dir} - source not found`);
        }
      });
    } else {
      console.warn(` Skipped ${dir} - source or target directory missing`);
    }
  });
}

if (oldPackage) {
  const srcRoot = path.join(androidPath, "app", "src", "main", "java");
  const oldPkgDir = path.join(srcRoot, ...oldPackage.toLowerCase().split("."));
  const newPkgDir = path.join(srcRoot, ...newPackage.toLowerCase().split("."));

  if (fs.existsSync(oldPkgDir)) {
    fs.mkdirSync(newPkgDir, { recursive: true });
    fs.readdirSync(oldPkgDir).forEach((file) => {
      fs.renameSync(path.join(oldPkgDir, file), path.join(newPkgDir, file));
    });
    fs.rmdirSync(oldPkgDir);
    const concursiveDir = path.dirname(oldPkgDir); // .../java/com/concursive
    if (
      fs.existsSync(concursiveDir) &&
      fs.readdirSync(concursiveDir).length === 0
    ) {
      fs.rmdirSync(concursiveDir);
    }
  }
}

console.log(` App setup completed for "${appName}"`);
