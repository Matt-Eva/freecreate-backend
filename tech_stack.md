# FreeCreate Tech Stack

## Databases and Asset Storage
    -MongoDB
        - Store bulk of content within MongoDb - everything except images.
    -Redis
        -Use Redis for session handling and possibly caching if necessary.
    -Amazon S3 && Cloudfront
        -Use S3 for image storage
        -Use Cloudfront with S3 for better delivery of assets
## Frontend
    -Nextjs
        -Use Nextjs to handle frontend routing and logic
        -Better SEO performance via server-side rendering
        -Ease of use due to component based system
    -CSS
        -Use CSS for overall styling
        -Rely on CSS library only for specific features
    -Material UI
        -Use Material UI library for some basic features
        -Research other Libraries like Chakra UI for style contrasts
## API
    - Express
        - Use express for the time being as the backend API framework
        - Lightweight, good for microservices, and works well with MongoDB
        - Better performance than Rails / Python and more easily customizable
        - Simplifies tech stack into a single language, making it easier to develop fullstack
        - Eventual goal is to potentially switch to Rust
            - Rust driver for MongoDB currently not supported very well