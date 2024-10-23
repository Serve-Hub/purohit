Installation
1)Clone the repository:
    git clone https://github.com/your-username/purohit.git
    cd purohit/backend
    
2)Install the dependencies:
    npm install
3)Environment Variables:
    Create a .env file in the root directory and add the following environment variables:
        PORT=5000
        DB_URI=mongodb://localhost:27017/purohitDB
        JWT_SECRET=your_secret_key
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        TWILIO_ACCOUNT_SID=your_twilio_account_sid
        TWILIO_AUTH_TOKEN=your_twilio_auth_token
        TWILIO_PHONE_NUMBER=your_twilio_phone_number
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
4)Running the Project
    To start the development server:
        npm run dev
