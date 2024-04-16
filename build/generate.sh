sass support-scss/main.scss > files-generated/main.css
cat support-typescript/Constants.ts \
    support-typescript/EnumDictionary.ts \
    support-typescript/MyUtilities.ts \
    support-typescript/CaseNote.ts \
    support-typescript/TaskTicket.ts \
    support-typescript/TaskTicketCategoryHelper.ts \
    support-typescript/DataHelper.ts \
    support-typescript/AnimationController.ts \
    support-typescript/LHSMenuController.ts \
    support-typescript/RHSContentController.ts \
    support-typescript/ToolbarController.ts \
    support-typescript/Main.ts \
    > files-generated/main.ts
tsc files-generated/main.ts

echo > ../docs/index.html
cat fragments/010.html >> ../docs/index.html

echo "<style>" >> ../docs/index.html
cat files-generated/main.css >> ../docs/index.html
echo "</style>" >> ../docs/index.html

echo '<script>' >> ../docs/index.html
cat node_modules/file-saver/dist/FileSaver.min.js >> ../docs/index.html
cat node_modules/jquery/dist/jquery.min.js >> ../docs/index.html
echo >> ../docs/index.html
cat files-generated/main.js >> ../docs/index.html
echo >> ../docs/index.html
cat support-vanillajs/ExtraLaunchSteps.js >> ../docs/index.html
echo '</script>' >> ../docs/index.html

cat fragments/090.html >> ../docs/index.html