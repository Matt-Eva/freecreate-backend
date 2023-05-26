# Cluster Schema

## Database: Short Stories

### Collection - Tag Search Content
    - Supported Queries
        - Queries for content based on genre and tag
    - Required Data
        -rank
        -rel_rank
        -rank_tracker (?)
        -rel_rank_tracker (?)
        -created_at
        -year
        -needs_update (?)
        -content_id
        -thumbnail
        -creator_id
        -creator_name
        -creator_thumbnail
        -genre
        -tags
        -title
        -description
    - Indexes
        - {year: -1, genre: 1, tags: 1, rank: -1, created_at: -1}
        - {year: -1, genre: 1, tags: 1, rel_rank: -1, created_at: -1}
        - {year: -1, genre: 1, rank: -1, created_at: -1}
        - {year: -1, genre: 1, rel_rank: -1, created_at: -1}
        - {year: -1, genre: 1, created_at: -1, rank: -1, }
        - {year: -1, genre: 1, created_at: -1, rel_rank: -1, }
        - {year: -1, genre: 1, tags: 1, created_at: -1, rank: -1, }
        - {year: -1, genre: 1, tags: 1, created_at: -1, rel_rank: -1, }
        - {year: -1, genre: 1, content_id: 1}
    - Shard Key
        - Year & Genre

### Collection - Content
    -Supported Queries
        - queries for an individual piece of content
    -Required Data
        -content
        -username
        -user_id
        -thumbnail
        -creator_id
        -creator_thumbnail
        -creator_name
        -title
        -description
        -genre
        -tags
        -rank
        -rel_rank
        -views
        -url_id: username + creatorname + title
    -Indexes
        -url_id
    -Shard key
        -url_id
    url_id is unique index

### Collection - Creator Short Stories
    - Supported Queries
        - Queries from creators for stories they've written.
        - Used for editing as well as analytics.


## Database - Users

### Collection - User Data
    -Supported Queries
        - Querying for a user by their username
    -Required Data
        -username (unique)
        -nickname
        -password
        -thumbnail (optional)
    -Index
        -username
    -Shard Key
        -username
    - Note: MongoDb supports unique indexes on shard keys.

### Collection - Likes
    -Supported Queries
        - Querying for likes by user_id
    -Required Data
        -user_id
        -content_id
        -content_thumbnail
        -content_title
        -content_description
        -genre
        -tags
    -Indexes
        -user_id
    -Shard Key
        -user_id

### Collection - Lib Items
    -Supported Queries
        -Querying for lib_items by user_id
    -Required Data
        -user_id
        -content_id
        -content_thumbnail
        -content_title
        -content_description
        -genre
        -tags
    -Indexes
        -user_id
    -Shard Key
        -user_id

### Collection - List Items
    -Supported Queries
        -Querying for list items by user_id
    -Required Data
        -user_id
        -content_id
        -content_thumbnail
        -content_title
        -content_description
        -genre
        -tags
    -Indexes
        -user_id
    -Shard Key
        -user_id

## Database - Donations

### Collection - Creator Donations
    Collects donation information to be accessed by creators
    Shard key on username

### Collection - User Donations
    Collects donation information to be accessed by a user
    Shard key on username

## Database - Creators

### Collection - Creator Profile
    - Supported Queries
        - query for creators by username
    - Required Data
        - username
        - creator_name
        - user_id
        - creator_thumbnail
        - genres
        - tags
        - description
        - search_terms
    - Indexes
        - username
    - Shard Key
        - username

### Collection - Tag Creator Search - for later
    -Supported Queries
        - Query for creators by tags and genres (all same array)
    -Required Data
        -username
        -creator_name
        -user_id
        -creator_thumbnail
        -genres
        -tags
        -description
        -creator_id
    -Index

### Collection - Text Creator Search - for later
    -Supported Queries
        - Text search by creator name and description
    -Required Data
        -username
        -creator_name
        -user_id
        -creator_thumbnail
        -description
        -genres
        -tags
        -search_terms
        -creator_id
    -Indexes
        -creator name, description, search_terms
    -Shard Key
        -creator name
        


