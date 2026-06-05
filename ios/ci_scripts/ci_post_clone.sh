#!/bin/bash
set -euo pipefail

echo "=== Xcode Cloud: iOS post-clone setup ==="

cd "$CI_PRIMARY_REPOSITORY_PATH"

# --- Install tooling ---
echo "Installing Node.js..."
brew install node

echo "Installing Bun..."
curl -fsSL https://bun.sh/install | bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# --- Configure npm registry for private @sudobility packages ---
echo "Configuring npm registry..."
cat > "$HOME/.npmrc" << NPMEOF
@sudobility:registry=https://registry.npmjs.org/
//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN:-${NPM_TOKEN:-}}
NPMEOF

# --- Install JS dependencies ---
echo "Installing JS dependencies..."
bun install --frozen-lockfile

# --- Write environment variables ---
cat > .env << EOF
EXPO_PUBLIC_API_URL=${EXPO_PUBLIC_API_URL:-}
VITE_APP_NAME=${VITE_APP_NAME:-}
VITE_APP_DOMAIN=${VITE_APP_DOMAIN:-}
VITE_COMPANY_NAME=${VITE_COMPANY_NAME:-}
EXPO_PUBLIC_FIREBASE_API_KEY=${EXPO_PUBLIC_FIREBASE_API_KEY:-}
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=${EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN:-}
EXPO_PUBLIC_FIREBASE_PROJECT_ID=${EXPO_PUBLIC_FIREBASE_PROJECT_ID:-}
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=${EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET:-}
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:-}
EXPO_PUBLIC_FIREBASE_APP_ID=${EXPO_PUBLIC_FIREBASE_APP_ID:-}
EXPO_PUBLIC_DEV_MODE=${EXPO_PUBLIC_DEV_MODE:-}
EOF

# --- Merge env (production mode skips .env.local) ---
echo "Merging environment files..."
BUILD_ENV=production node scripts/merge-env.js

# --- Install CocoaPods ---
echo "Installing CocoaPods dependencies..."
cd ios
pod install

echo "=== iOS post-clone setup complete ==="
