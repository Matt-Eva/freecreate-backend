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
    - Shard Key
        - Year & Genre

### Collection - Text Search Content
    - Supported Queries
        - Queries for content based on title
    - Required Data
        - title
        - description
        - thumbnail
        - creator_thumbnail
        - creator_id
        - creator_name
        - content_id
        - rank
        - rel_rank
        - genre
        - search terms
    - Indexes
        - title and description text index
    - Shard Key
        - title

### Collection - Content
    -Supported Queries
        - queries for an individual piece of content
    -Required Data
        -content
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
    -Indexes
        -Genre and Object_id
    -Shard key
        - genre and object_id

### Collection - Collection Entries
    -Required Data
        -content
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

### Collection - Collections (for later)

### Collection - Rank Update Docs
    - Supported Queries
        - querying for docs by date
    -Required Data
        -date
        -text_search_content_id
        -tag_search_content_id
        -rank
        -rel_rank
    -Indexes
        -date

## Database - Users

### Collection - User Data
    -Supported Queries
        - Querying for a user by their username
    -Required Data
        -username
        -nickname
        -thumbnail (optional)
    -Index
        -username
    -Shard Key
        -username

### Collection - User Credentials
    - Supported Queries
        - Querying for a user by their username
    -Required Data
        -username
        -password
    -Index
        -username
    -Shard Key
        -username


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

### Collection - Donations
    -Supported Queries
        -Querying for donations by user_id
    -Required Data
        -user_id
        -username
        -amount
        -creator_id
        -creator_name
    -Shard key
        -user_id


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

### Collection - Creator Content
    - Supported Queries
        - search for content by creator_id
    -Required Data
        -thumbanil
        -creator_id
        -title
        -description
        -creator_thumbnail
        -creator_name
        -genre
        -tags
        -rank
        -rel_rank
        -content_id
    -Indexes
        -creator_id
    -Shard Key
        -creator_id

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
        


