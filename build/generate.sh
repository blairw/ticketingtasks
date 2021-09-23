sass support-scss/main.scss > files-generated/main.css
cat support-typescript/Constants.ts \
    support-typescript/MyUtilities.ts \
    support-typescript/CaseNote.ts \
    support-typescript/TaskTicket.ts \
    support-typescript/DataHelper.ts \
    support-typescript/MenuController.ts \
    support-typescript/Main.ts \
    > files-generated/main.ts
tsc files-generated/main.ts

echo > ../output/index.html
cat fragments/010.html >> ../output/index.html

echo "<style>" >> ../output/index.html
cat files-generated/main.css >> ../output/index.html
echo "</style>" >> ../output/index.html

echo '<script>' >> ../output/index.html
cat node_modules/jquery/dist/jquery.min.js >> ../output/index.html
cat files-generated/main.js >> ../output/index.html
echo '</script>' >> ../output/index.html

cat fragments/090.html >> ../output/index.html