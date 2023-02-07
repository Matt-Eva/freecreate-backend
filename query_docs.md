# Query Strategies and Data Storage Solutions

## Queries to all writing

-Query all writing, over all time, sorted by rank
    -Necessary query data
        -rank
        -rel_rank
-Query all writing, with tags, over all time, sorted by rank
    -Necessary query data
        -tags
        -rank
        -rel_rank
-Query all writing, within a certain time frame, sorted by rank
    -Necessary query data
        -created_at
        -rank
        -rel_rank
-Query all writing, with tags, within a certain time frame, sorted by rank
    -Necessary query data
        -created_at
        -tags
        -rank
        -rel_rank
-Query all writing, sorted by most recent, sorted by rank
    -Necessary query data
        -created_at
        -rank
        -rel_rank
-Query all writing, with tags, sorted by most recent, sorted by rank
    -Necessary query data
        -created_at
        -tags
        -rank
        -rel_rank

Overall query structures:
-One
    -rank
    -rel_rank
-Two
    -tags
    -rank
    -rel_rank
-Three
    -created_at
    -rank
    -rel_rank
-Four
    -tags
    -created_at
    -rank
    -rel_rank
        

## Queries by writing type

### Over all time
-Query all writing, over all time, sorted by rank 
    -Necessary query data
        -Rank
        -Rel_rank
-Query writing by genre, over all time, sorted by rank
    -Necessary query data
        -Genres
        -rank
        -rel_rank
-Query writing by tag, over all time, sorted by rank
    -Necessary query data
        -tags
        -rank
        -rel_rank
-Query writing by genre and tag, over all time, sorted by rank
    -necessary query data
        -genres
        -tags
        -rank
        -rel_rank

### Within a certain time period
-Query all writing, within a certain time period, sorted by rank
    -Necessary query data
        -Rank
        -Created_at
        -Rel_rank
-Query specific genres, within a certain time period, sorted by rank
    -Necessary query data
        -Genres
        -created_at
        -rank
        -rel_rank
-Query all writing, with tags, within a certain time period, sorted by rank
    -Necessary query data
        -tags
        -created_at
        -rank
        -rel_rank
-Query with both genres and tags, within a certain time period, sorted by rank

### Most recently posted
-Query most recent writing, sorted by creation_date, then sorted by rank
    -Necessary query data
        -created_at
        -rank
        -rel_rank
-Query most recent writing, with tags, sorted by creation_date, sorted by rank
    -Necesary query data
        -tags
        -created_at
        -rank
        -rel_rank
-Query most recent writing, with genres, sorted by creation_date, sorted by rank
-Query most recent writing, with genres and tags, sorted by creation_date, sorted by rank

Query Structures
-One
    -rank
    -rel_rank
-Two
    -genres
    -rank
    -rel_rank
-
    -tags
    -rank
    -rel_rank
-Three
    -genres
    -tags
    -rank
    -rel_rank
-Four
    -created_at
    -rank
    -rel_rank
-Five
    -genres
    -created_at
    -rank
    -rel_rank
-Six
    -genres
    -tags
    -created_at
    -rank
    -rel_rank

Workaround - require people to input genre when searching. shard key on genre (when necessary).
    - genre is composed of all the genres the author wants to include. For example, a genre of Fantasy and Romance would have the genre FantasyRomance. Genre filters to Fantasy or to Romance will not return results for the FantasyRomance genre.
    - Could simply shard on year and deal with hot shard.

Start with just Fiction for the time being - short stories, novelletes, novellas, and novels.
Use separate database for each?

Might make more sense to actually shard on the year. This would restrict incoming insert (as well as most queries), to a single shard within the database, but the goal is rather to preserve data in the long run.

Could shard on year and genre. Then design frontend such that all queries could include a year and a genre.

Indexing strategy:
    Indexes:
        - {year: -1, genre: 1, tags: 1, rank: -1, created_at: -1}
        - {year: -1, genre: 1, tags: 1, rel_rank: -1, created_at: -1}
        - {year: -1, genre: 1, rank: -1, created_at: -1}
        - {year: -1, genre: 1, rel_rank: -1, created_at: -1}
        - {year: -1, genre: 1, created_at: -1, rank: -1, }
        - {year: -1, genre: 1, created_at: -1, rel_rank: -1, }
        - {year: -1, genre: 1, tags: 1, created_at: -1, rank: -1, }
        - {year: -1, genre: 1, tags: 1, created_at: -1, rel_rank: -1, }

Limit number of search tags to 10.

To update rank and rel_rank
    - have separate fields called rank_tracker and rel_rank tracker (non-indexed).
    - Set a view counter on each doc as well. 
    - Set a "needs update" field too.
    - run a daily job that queries for all pieces that "need an update", and updates their corresponding values in the database. Prevents such massive write overhead to the database.
    - Set param for the preceding day too, to make sure it only processes updates from the previous day, rather than having to process updates that may be continuing.
    - Minimizes write-operations to indexed fields, making overall write intensity to database easier.
