
dir="../proyecto-full-stack-client/vue-project"

git rm -r dist
git commit -m "rm dist"
cp -r $dir/dist .
git add .
git commit -m "add dist"