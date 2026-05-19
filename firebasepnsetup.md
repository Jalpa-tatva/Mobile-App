**Push Notification Setup With Firebase & react-native-push-notiifcation(Including ios) Library**


1. _Install Following Modules_
   @react-native-firebase/app //Version Used in SLR : ^16.5.2
   @react-native-firebase/messaging //Version Used in SLR : ^15.3.0
   React-native-push-notification


2. **For Connection With Firebase**

- For firebase setup in your project refer this link https://www.pluralsight.com/guides/setting-up-a-firebase-project-for-react-native


- On the Firebase console, add a new Android application and enter your projects details. The "Android package name" must match yourlocal projects package name which can be found inside of the manifest tag within the /android/app/src/main/AndroidManifest.xml file within your project. @Android-Setup

- Download the google-services.json file and place it inside of your project at the following location: /android/app/google-services.json. @Android-Setup

- add the google-services plugin as a dependency inside of your /android/build.gradle @Android-Setup
  buildscript {
  dependencies {
  // ... other dependencies
  classpath 'com.google.gms:google-services:4.3.14' //Add this line
  }
  }
  
  
- add plugin and inside following dependency into your /android/app/build.gradle(App level gradle) @Android-Setup
    dependencies {
    ...
    implementation 'com.google.firebase:firebase-analytics:17.3.0'
    ...
    }
    apply plugin: 'com.google.gms.google-services' //Add this line
    
    
- On the Firebase console, add a new iOS application and enter your projects details. The "iOS bundle ID" must match your local project bundle ID. The bundle ID can be found within the "General" tab when opening the project with Xcode. @ios-setup


- Firebase Cloud Messaging can use either an APNs authentication key or APNs certificate to connect with APNs,so add the APNs authentication or APNs certificate.following step we follow.

- Upload your APNs authentication key to Firebase. If you don't already have an APNs authentication key, make sure to create one in the Apple Developer Member Center.
    1.Inside your project in the Firebase console, select the gear icon, select Project Settings, and then select the Cloud Messaging tab.
    2.In APNs authentication key under iOS app configuration, click the Upload button.
    3.Browse to the location where you saved your key, select it, and click Open. Add the key ID for the key (available in the Apple Developer Member Center) and click Upload.
    
- If you don't have APNs authentication key then create one according to following https://developers.moengage.com/hc/en-us/articles/8484447635348-APNS-Authentication-Key
   
    
- Download the GoogleService-Info.plist file and add it in xcode -> projectName -> Add Files. @ios-setup

- In AppDelegate.m file, add the following: @ios-setup
  At the top of the file, import the Firebase SDK:
  #import <Firebase.h>
  Within your existing didFinishLaunchingWithOptions method, add the following to the top of the method:
  [FIRApp configure];
  
  
- In Ios podfile, add the following : @ios-setup
  On top of file : $RNFirebaseAsStaticFramework = true
  pod 'RNFBApp', :path => '../node_modules/@react-native-firebase/app'
  // Do this if you have flipper setup in pod for mapbox
  pod 'FirebaseCore', :modular_headers => true
  pod 'GoogleUtilities', :modular_headers => true


3.  _react-native-push-notification library setup_
    Follow all step for Ios : https://github.com/react-native-push-notification/ios
    Follow all Steps for android : https://github.com/zo0r/react-native-push-notification
                           *** *** ***
         In App File -> Call : requestUserPermission();
                        AND
         In Spalsh Screen File -> UseEffect -> Call : requestUserPermission();
                                                      NotificationListener(navigation);
         Make sure Push notiifcation enables in Xcode
        
        
- Before your app can receive push notifications, you need to request permission from the user. You can do this by adding the following code to your app..
   messaging().requestPermission().then((permission) => {
          if(permission) {
            console.log('Permission granted');
          } else {
            console.log('Permission denied');
          }
    });
             
- In App file added the following foreground handler

   //Handle incoming notifications when app is in foreground

   messaging().onMessage(async (remoteMessage) => {
        console.log('Received foreground notification: ', remoteMessage);
    });
    
- In NotificationListener add the following code

    PushNotification.configure({
        onNotification: function (notification) {
          console.log('notificaton is come', notification);
          }
    })
    
    // Handle incoming notifications when app is in background
    
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log('Received background notification: ', remoteMessage);
    });

    // Handle incoming notifications when app is closed
    
    messaging().getInitialNotification().then(async (remoteMessage) => {
    console.log('Received closed app notification: ', remoteMessage);
    });

    To receive push notifications, you need to generate a token. You can do this by adding the following code to your app:
    messaging().getToken().then((token) => {
      console.log(token);
    });

         

