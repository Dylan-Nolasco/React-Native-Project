const React = require("react-native");
const { Dimensions } = React;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default {
  container: {
    backgroundColor: 'white',
    height: deviceHeight,
    marginBottom: 10,
    flex: 1
  },
  text: {
    color: '#7A7777',
    fontSize: 26,
    textAlign: 'center',
    margin: 8
  },
  bgContainer: {
    position: 'absolute',
    height: (deviceHeight / 3),
    width: deviceWidth
  },
  bgImg: {
    flex: 1
  },
  profileImg: {
    position: "absolute",
    top: 140,
    left: deviceWidth / 4,
    width: deviceWidth / 2,
    height: deviceWidth / 2,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden",
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    marginTop: (deviceHeight / 2.2)
  },
  infoText: {
    fontSize: 30,
    margin: 18
  },

  
}