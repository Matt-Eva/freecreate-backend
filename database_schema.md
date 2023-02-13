# Cluster Schema

## Database: Short Stories

### Collection - Tag Search Content
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

### Collection - Content
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

### Collection - Collections (for later)

### Collection - Rank Update Docs
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
    -Required Data
        -username
        -nickname
        -thumbnail (optional)
        -bookshelves
            -bookshelf_name
                - array of writing_ids
    -Index
        -username

### Collection - User Credentials
    -Required Data
        -username
        -password
    -Index
        -username


### Collection - Likes
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
    -Required Data
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

## Database - Creators

### Collection - Tag Creator Search
    -Required Data
        -username
        -creator_name
        -user_id
        -creator_thumbnail
        -genres
        -tags
        -description
    -Index
        -user_id

### Collection - Creators Content
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

### Collection - Text Creator Search
    -Required Data
        -username
        -creator_name
        -user_id
        -creator_thumbnail
        -description
        -genres
        -tags
        -search_terms
    -Indexes
        


