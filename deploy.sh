#!/usr/bin/env bash
SERVER="free_ec2"
BUILD_PATH="build"
DEPLOY_PATH="server"

# compile
swc src -d lib --copy-files
rm -rf $BUILD_PATH
mkdir $BUILD_PATH
cp package.json $BUILD_PATH/
cp -r lib $BUILD_PATH/
cp -r config $BUILD_PATH/
cp -r public $BUILD_PATH/

# sync build
rsync -avuz $BUILD_PATH/* $SERVER:$DEPLOY_PATH
rm -rf $BUILD_PATH
ssh $SERVER "cd $DEPLOY_PATH && pm2 restart 1"
echo "Done"
