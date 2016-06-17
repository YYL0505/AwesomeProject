# react native ----AwesomeProject

getting started
------------------------------------------------
1.clone code via:
    git clone https://github.com/YYL0505/AwesomeProject.git

2.install Homebrew via:
    ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

3.install node js via:
    brew install node
    (comment: NodeJS 4.0 or greater is required for React Native. The default Homebrew package for Node is currently 6.0, so that is not an issue.)

4.React Native Command Line Tools via:
    npm install -g react-native-cli
    (comment: If you see the error, EACCES: permission denied, please run the command: sudo npm install -g react-native-cli.)

5.install Watchman via:
    brew install watchman

6.install Flow via:
    brew install flow

7.install Genymotion(For Android develop) or Xcode(For Android develop) via:
install Genymotion
    # Download and install Genymotion.
    # Open Genymotion. It might ask you to install VirtualBox unless you already have it.
    # Create a new emulator and start it.
    # To bring up the developer menu press ⌘+M

install Xcode:
    #Xcode 7.0 or higher. Open the App Store or go to https://developer.apple.com/xcode/downloads/


8.install dependencies via:
    nmp install

9.run project via:
    For Android: react-native run-android
    For IOS: react-native run-ios