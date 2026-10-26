#!/bin/sh
# Lists the web bundles that contain react-native-reanimated or react-native-worklets, with their size.
for f in dist/_expo/static/js/web/*.js; do
  if grep -q "react-native-reanimated\|react-native-worklets" "$f"; then echo "reanimated in $(basename "$f") ($(du -k "$f" | cut -f1) KB)"; fi
done
echo "total JS: $(cat dist/_expo/static/js/web/*.js | wc -c | awk '{printf "%d KB", $1/1024}')"
