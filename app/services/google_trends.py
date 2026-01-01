from pytrends.request import TrendReq

pytrend = TrendReq(hl='en-US', tz=330)

async def get_trending_topics(interests: list):
    keywords = interests[:5] if interests else ["technology", "software"]
    pytrend.build_payload(keywords, timeframe='now 7-d')
    trends = pytrend.related_queries()

    trending_list = []
    for key in keywords:
        if trends.get(key) and trends[key].get('top') is not None:
            top = trends[key]['top'].head(3).values.tolist()
            trending_list.extend([t[0] for t in top])
    
    return list(set(trending_list))[:5]
