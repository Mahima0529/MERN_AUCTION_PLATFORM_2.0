"""
Sample historical closed auction records and live catalog items for RAG retrieval.
In production, this is synced from MongoDB / Redshift closed auction records.
"""

HISTORICAL_AUCTION_COMPS = [
    # Electronics
    {
        "id": "comp_100a",
        "title": "Apple iPhone 15 Pro Max 256GB Natural Titanium",
        "category": "Electronics",
        "condition": "New",
        "clearing_price": 1080.0,
        "starting_bid": 700.0,
        "num_bids": 24,
        "description": "Brand new factory sealed in box, 1-year AppleCare warranty, unlocked.",
        "date_closed": "2026-08-25"
    },
    {
        "id": "comp_100b",
        "title": "Apple iPhone 15 Pro Max 256GB Blue Titanium",
        "category": "Electronics",
        "condition": "Used",
        "clearing_price": 950.0,
        "starting_bid": 600.0,
        "num_bids": 19,
        "description": "Mint used condition, 99% battery health, screen protector installed.",
        "date_closed": "2026-08-18"
    },
    {
        "id": "comp_101",
        "title": "Apple iPhone 13 Pro 128GB Sierra Blue",
        "category": "Electronics",
        "condition": "Used",
        "clearing_price": 540.0,
        "starting_bid": 250.0,
        "num_bids": 18,
        "description": "Minor scratches on bezel, battery health 88%, unlocked for all carriers, original box included.",
        "date_closed": "2026-08-15"
    },
    {
        "id": "comp_102",
        "title": "Apple iPhone 13 128GB Midnight",
        "category": "Electronics",
        "condition": "Used",
        "clearing_price": 420.0,
        "starting_bid": 200.0,
        "num_bids": 14,
        "description": "Used condition, screen protector applied, 85% battery capacity.",
        "date_closed": "2026-08-20"
    },
    {
        "id": "comp_103",
        "title": "Apple iPhone 13 Pro Max 256GB Graphite",
        "category": "Electronics",
        "condition": "New",
        "clearing_price": 690.0,
        "starting_bid": 350.0,
        "num_bids": 22,
        "description": "Brand new sealed in box with 1-year Apple warranty.",
        "date_closed": "2026-08-28"
    },
    {
        "id": "comp_104",
        "title": "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
        "category": "Electronics",
        "condition": "Used",
        "clearing_price": 240.0,
        "starting_bid": 100.0,
        "num_bids": 12,
        "description": "Black colorway, pristine ear cushions, includes travel case and aux cable.",
        "date_closed": "2026-08-10"
    },
    {
        "id": "comp_105",
        "title": "MacBook Pro 14 M1 Pro 16GB 512GB Space Gray",
        "category": "Electronics",
        "condition": "Used",
        "clearing_price": 1150.0,
        "starting_bid": 600.0,
        "num_bids": 27,
        "description": "Excellent cosmetic condition, battery cycle count 120, MagSafe charger.",
        "date_closed": "2026-08-25"
    },

    # Watches & Jewelry
    {
        "id": "comp_201",
        "title": "Omega Speedmaster Professional Moonwatch Chronograph",
        "category": "Watches",
        "condition": "Used",
        "clearing_price": 4650.0,
        "starting_bid": 2500.0,
        "num_bids": 34,
        "description": "Hesalite crystal, manual wind caliber 1861, with box and warranty card from 2021.",
        "date_closed": "2026-07-30"
    },
    {
        "id": "comp_202",
        "title": "Seiko SKX007 Automatic Diver 200m Watch",
        "category": "Watches",
        "condition": "Used",
        "clearing_price": 310.0,
        "starting_bid": 120.0,
        "num_bids": 15,
        "description": "Classic discontinued diver on jubilee bracelet, 7S26 movement keeps strong time.",
        "date_closed": "2026-08-12"
    },
    {
        "id": "comp_203",
        "title": "Rolex Submariner Date 126610LN Ceramic Bezel",
        "category": "Watches",
        "condition": "New",
        "clearing_price": 12800.0,
        "starting_bid": 8000.0,
        "num_bids": 45,
        "description": "Unworn 2026 box and papers complete set, green hangtag, full links.",
        "date_closed": "2026-08-30"
    },

    # Cameras & Photography
    {
        "id": "comp_301",
        "title": "Canon AE-1 35mm Vintage SLR Film Camera with 50mm f/1.8",
        "category": "Cameras",
        "condition": "Used",
        "clearing_price": 175.0,
        "starting_bid": 60.0,
        "num_bids": 19,
        "description": "Fully functional light meter, clear viewfinder, fresh battery, no shutter squeak.",
        "date_closed": "2026-08-05"
    },
    {
        "id": "comp_302",
        "title": "Fujifilm X-T4 Mirrorless Camera Body Black",
        "category": "Cameras",
        "condition": "Used",
        "clearing_price": 920.0,
        "starting_bid": 500.0,
        "num_bids": 16,
        "description": "Shutter count under 8k, includes 2 OEM batteries and dual charger.",
        "date_closed": "2026-08-22"
    },

    # Collectibles & Art
    {
        "id": "comp_401",
        "title": "Charizard 1st Edition Base Set Holo PSA 8",
        "category": "Collectibles",
        "condition": "Used",
        "clearing_price": 3800.0,
        "starting_bid": 1500.0,
        "num_bids": 38,
        "description": "Graded PSA 8 NM-MT, holographic surface clean, crisp centering.",
        "date_closed": "2026-08-18"
    },
    {
        "id": "comp_402",
        "title": "Michael Jordan 1986 Fleer Rookie Card BGS 7.5",
        "category": "Collectibles",
        "condition": "Used",
        "clearing_price": 4200.0,
        "starting_bid": 2000.0,
        "num_bids": 29,
        "description": "Beckett graded 7.5 Near Mint+, subgrades: Centering 8, Corners 7.5, Edges 7.5, Surface 8.",
        "date_closed": "2026-07-25"
    }
]

LIVE_AUCTION_SEED = [
    {
        "_id": "66e1001",
        "title": "Canon AE-1 Program 35mm SLR Camera with 50mm f/1.4 Lens",
        "category": "Cameras",
        "condition": "Used",
        "startingBid": 75.0,
        "currentBid": 130.0,
        "description": "Classic vintage film camera in working order with sharp prime lens.",
        "endTime": "2026-09-12T18:00:00Z"
    },
    {
        "_id": "66e1002",
        "title": "Apple iPhone 13 128GB Starlight",
        "category": "Electronics",
        "condition": "Used",
        "startingBid": 150.0,
        "currentBid": 320.0,
        "description": "Clean condition, unlocked, battery health 87%.",
        "endTime": "2026-09-10T14:30:00Z"
    },
    {
        "_id": "66e1003",
        "title": "Seiko Prospex Turtle SRP777 Automatic Diver",
        "category": "Watches",
        "condition": "Used",
        "startingBid": 120.0,
        "currentBid": 210.0,
        "description": "Cushion case diver on black silicone strap, 200m water resistance.",
        "endTime": "2026-09-11T20:00:00Z"
    },
    {
        "_id": "66e1004",
        "title": "Sony WH-1000XM5 ANC Headphones Silver",
        "category": "Electronics",
        "condition": "New",
        "startingBid": 180.0,
        "currentBid": 230.0,
        "description": "Brand new in box, sealed, platinum silver edition.",
        "endTime": "2026-09-13T12:00:00Z"
    }
]
