# Cluster Schema

## Database: Short Stories

### Collection - Tag Search Content
    - Supported Queries
        - Queries for content based on genre and tag
    - Required Data
        -rank
        -rel_rank
        -created_at
        -year
        -needs_update (?)
        -url_id
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
        -username
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

## Database - Flags

### Collection - User Flags
    - A user can look up the flags they've created

### Collection - Creator Flags
    - Flags for specific creators can be looked up

## Database - Donations

### Collection - Creator Donations
    - Collects donation information to be accessed by creators
    - Shard key on user_id
    - Can also be used to query for donations for specific pieces of content

### Collection - User Donations
    Collects donation information to be accessed by a user
    Shard key on user_id

## Database - Creators

### Collection - Creator Profile
    - Supported Queries
        - query for creators by user_id
    - Required Data
        - username
        - creator_name
        - user_id
        - creator_thumbnail
        - genres
        - tags
        - description
        - search_terms
        - creations - embedded data on all a creator's creations.
    - Indexes
        - user_id
    - Shard Key
        - user_id
        


