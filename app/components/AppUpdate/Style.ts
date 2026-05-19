import { color, font, fontSize } from "@app/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    width: "88%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: fontSize(20),
    fontFamily: font.Poppins_SemiBold,
    color: "#111",
  },

  subtitle: {
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Regular,
    color: "#555",
    marginTop: 10,
    lineHeight: 20,
  },

  buttonPrimary: {
    backgroundColor: color.secondary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },

  buttonPrimaryText: {
    color: "#fff",
    fontSize: fontSize(15),
    fontFamily: font.Poppins_Bold,
  },

  buttonSecondary: {
    marginTop: 14,
    alignItems: "center",
  },

  buttonSecondaryText: {
    color: "#888",
    fontSize: fontSize(14),
    fontFamily: font.Poppins_Regular,
  },
});