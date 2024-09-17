Instruction from setting up Contentful account.

1. Create contentful account using gmail account
2. Delete training data: "Start from scratch" -> "Skip onboarding"<br><br>
![2024-03-19 12_14_45-Window](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/84f83035-bdf9-4aac-89c5-ebbf851a034b)
![2024-03-19 12_15_30-](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/8c8d9b53-5231-4784-b568-24d6aad1d233)
<br><br>
3. Open console. Install contentful-cli using <b>"npm install -g contentful-cli"</b>. Doc - https://github.com/contentful/contentful-cli
4. Login into your account using <b>"contentful login"</b>
5. You can check your space id and environment id using commands <b>"contentful space list"</b> and <b>"contentful space --space-id YOUR_SPACE_ID environment list"</b>
6. In order to add exhibit content model run <b>"contentful space --space-id YOUR_SPACE_ID migration --environment-id YOUR_ENVIRONMENT_ID migrations/1_EPMGCIP-123_add-exhibit.js"</b>
7. Add secrets to github account (for local environment add variables to .env):
 a) go to "settings" -> "actions" -> "new repository secret"<br>
 b) add "VITE_CONTENTFUL_SPACE_ID" - use command <b>"contentful space list"</b><br>
 c) add "VITE_CONTENTFUL_ENVIRONMENT" - use command <b>"contentful space --space-id YOUR_SPACE_ID environment list"</b><br>
 d) add "VITE_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN" and "VITE_CONTENTFUL_CONTENT_PREVIEW_ACCESS_TOKEN". Tokens are available in "settings" -> "API keys" -> "Add API key"
<br><br>
![Screenshot 2024-03-19 110658](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/a3d58f10-4585-4656-9eee-a71aa5db8361)
<br><br>
8. Add QR code application:
 a) add REACT_APP_DOMAIN=YOUR_DOMAIN to .env
 b) build app using <b>"npm run build"</b> on local machine<br>
 c) go to contentful - "App" -> "Custom apps" -> "Manage app definitions" -> "Create App"<br>
 <br><br>
![2024-03-19 11_26_24-NotificationsController cs - orthobullets - Visual Studio Code](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/fee55b62-3671-4895-b6c3-8370b0b4d21e)
<br><br>
 d) type "Name"<br>
 e) enable "Hosted by Contentful"<br>
 f) upload bundle - all files from "build"<br>
 g) check "Entry sidebar"<br>
 h) save<br><br>
![Screenshot 2024-03-19 115635](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/9daf8175-9e77-4a0b-ae57-d2cdad5ea142)
<br><br>
9. go to "Content model" -> "Exhibit" -> "Sidebar" -> click "plus" icon to add QR code application -> save
<br><br>
![2024-03-19 12_02_43-Settings](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/347765e8-b8fe-493f-aa69-41af1ea88f21)
![2024-03-19 12_03_51-Settings](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/51c1c81c-a0ee-417c-b647-ed7abf40c20e)
