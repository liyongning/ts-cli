#!/bin/bash

echo '开始构建脚手架'

npm run build

echo '脚手架构建完成，现在发布'

npm publish --access public