# How to Add Your Video

## Steps:

1. **Get your video file** - Download or prepare the video you want to use (MP4 format recommended)

2. **Rename the video** - Rename your video file to something simple, for example:
   - `shahd-song.mp4`
   - `our-song.mp4`
   - Or keep it as `your-video-name.mp4`

3. **Place the video** - Copy your video file into the `video` folder:
   ```
   /Users/tareqorabi/Sahad/video/your-video-name.mp4
   ```

4. **Update the HTML** - If you renamed your video to something other than `your-video-name.mp4`, open `index.html` and find this line (around line 186):
   ```html
   <source src="video/your-video-name.mp4" type="video/mp4">
   ```
   
   Change `your-video-name.mp4` to match your actual filename.

## Example:

If your video is named `shahd-song.mp4`, the line should be:
```html
<source src="video/shahd-song.mp4" type="video/mp4">
```

## Supported Video Formats:

- **MP4** (recommended) - Best compatibility
- **WebM** - Good for web
- **OGG** - Alternative format

If you have multiple formats, you can add multiple source tags:
```html
<video id="myVideo" controls width="100%">
    <source src="video/shahd-song.mp4" type="video/mp4">
    <source src="video/shahd-song.webm" type="video/webm">
    Your browser does not support the video tag.
</video>
```

## Note:
The video folder has been created at: `/Users/tareqorabi/Sahad/video/`
