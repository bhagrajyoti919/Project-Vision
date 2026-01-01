async def generate_media_prompts(title, description):
    return {
        "image_prompt": f"A modern and futuristic representation of {title}, {description}",
        "video_prompt": f"A promotional video for {title}, highlighting {description}"
    }
