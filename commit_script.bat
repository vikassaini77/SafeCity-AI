git add endee/third_party/msgpack/ endee/third_party/roaring_bitmap/
git commit -m "chore: remove unused third_party libraries"

git add events/violence/
git commit -m "chore: clean up old violence event images"

git add backend/Dockerfile frontend/Dockerfile docker-compose.yml backend/render.yaml frontend/vercel.json
git commit -m "chore: add docker and deployment configurations"

git add backend/app/routes/auth.py backend/app/utils/auth.py backend/app/utils/email.py backend/app/routes/trtc.py
git commit -m "feat(backend): add authentication and TRTC routes"

git add frontend/package.json frontend/package-lock.json
git commit -m "chore(frontend): update npm dependencies"

git add frontend/src/components/chat/ frontend/src/components/enterprise/ frontend/src/pages/settings/
git commit -m "feat(frontend): add chat widget, enterprise components, and settings tabs"

git add frontend/src/pages/*Page.tsx frontend/src/components/layout/LegalPageLayout.tsx frontend/src/data/contentData.tsx
git commit -m "feat(frontend): add new public landing, legal, and documentation pages"

git add frontend/src/components/layout/ frontend/src/components/ui/
git commit -m "feat(frontend): update dashboard layout and UI components"

git add frontend/src/pages/
git commit -m "feat(frontend): update main application pages"

git add frontend/src/App.tsx frontend/src/index.css frontend/src/data/mockData.ts frontend/src/hooks/useSafeCityAPI.ts frontend/src/store/authStore.ts frontend/src/types/index.ts frontend/src/lib/api.ts frontend/public/
git commit -m "feat(frontend): update global state, routing, and API hooks"

git add .
git commit -m "chore: final miscellaneous updates and test files"

git push origin HEAD
