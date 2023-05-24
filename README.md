# freecreate-menn-backend

## MVP

- No payment
- No image storage

## Indexes

Indexes on writing:
    - tags / genres
        - due to compound and multi-key indexing rules, this must be a single array
    - rank - sort
    - title - text index
        - 
    - created_at
        - needed to specify time range for query. Must be a range.
    

Index test mflxi:
    - create an index on genres (array), followed by runtime (sort), followed by year (range)
        - concern - setting limit with sort will truncate the range index query. This seems unlikely, but I want to verify.


Common Queries:

- Fetching Single Chapters / Pieces of content - chapter collection
    - Going to fetch these on the _id index, as we won't be searching for these in queries due to separation of metadata and content
- Querying for specific writing - writing collection or individual writing type collection.
    - query on either the name, description, and rank or rel_rank using text search or 
        - create separate collection for description stuff specifically - shard_key and index on name
    - query on tags (and "genres")
        - create a collection for tags and genres specifically. shard_key on genres.