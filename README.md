Instruction from setting up Contentful account.

1. Create contentful account using gmail account
2. Delete training data: "Start from scratch" -> "Skip onboarding"
![2024-03-19 12_14_45-Window](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/84f83035-bdf9-4aac-89c5-ebbf851a034b)
![2024-03-19 12_15_30-](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/8c8d9b53-5231-4784-b568-24d6aad1d233)
3. Open console. Install contentful-cli using "npm install -g contentful-cli". Doc - https://github.com/contentful/contentful-cli
4. Login into your account using "contentful login"
5. You can check your space id and environment id using commands "contentful space list" and "contentful space --space-id YOUR_SPACE_ID environment list"
6. In order to add exhibit content model run "contentful space --space-id YOUR_SPACE_ID migration --environment-id YOUR_ENVIRONMENT_ID migrations/1_EPMGCIP-123_add-exhibit.js"
7. Add secrets to github account:
 a) go to "settings" -> "actions" -> "new repository secret"
 b) add "VITE_CONTENTFUL_SPACE_ID" - use command "contentful space list"
 c) add "VITE_CONTENTFUL_ENVIRONMENT" - use command "contentful space --space-id YOUR_SPACE_ID environment list"
 d) add "VITE_CONTENTFUL_CONTENT_DELIVERY_ACCESS_TOKEN" and "VITE_CONTENTFUL_CONTENT_PREVIEW_ACCESS_TOKEN". Tokens are available in "settings" -> "API keys" -> "Add API key"
![Screenshot 2024-03-19 110658](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/a3d58f10-4585-4656-9eee-a71aa5db8361)
9. Add QR code application:
 a) build app using "npm run build" on local machine
 b) go to contentful - "App" -> "Custom apps" -> "Manage app definitions" -> "Create App"
![2024-03-19 11_26_24-NotificationsController cs - orthobullets - Visual Studio Code](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/fee55b62-3671-4895-b6c3-8370b0b4d21e)
 c) type "Name"
 d) enable "Hosted by Contentful"
 e) upload bundle - all files from "build"
 f) check "Entry sidebar"
![Screenshot 2024-03-19 115635](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/9daf8175-9e77-4a0b-ae57-d2cdad5ea142)
 g) save
11. go to "Content model" -> "Exhibit" -> "Sidebar" -> click "plus" icon to add QR code application -> save
![2024-03-19 12_02_43-Settings](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/347765e8-b8fe-493f-aa69-41af1ea88f21)
![2024-03-19 12_03_51-Settings](https://github.com/epam/epmgcip-chaperone.contentful/assets/18456022/51c1c81c-a0ee-417c-b647-ed7abf40c20e)
