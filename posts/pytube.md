---
author: "Jim Lynn"
title: Download from YouTube with Python
date: 2022-12-16
description: Pytube and ffmpeg-python provide an easy way to download and view YouTube videos and audio only files. 
image: /static/img/MarkdownPost.svg
tags:
 - Python
 - YouTube
---

I like listening to podcasts while walking my dog and wanted to listen to sermons from my local church.  Unfortunately, the sermons are only full videos on YouTube.  Extracting only the audio is what began my journey to pytube and ffmpeg-python. I like Python, and it seemed like a likely place to begin.   I did a Google search for python packages that could help me and that's when I discovered pytube!!  Pytube provides functionality that allows not only the ability to download the audio from YouTube videos,  but provides lots of other functionality as well. I will document several of the capabilities that I employ in this post.

## Installing PyTube and ffmpeg-python 

FFMpeg is required for the ffmpeg-python package and I installed it using Brew.  (I use a Mac).
the command to install was:
```code
brew install ffmpeg
```
Once installed, I installed the two python packages, ffmpeg-python and pytube. 
```code
pip install ffmpeg-python
pip install pytube
```
## Using pytube to download the audio 

Once both packages were installed I was ready to write the code to download the "audio only" file from YouTube.  What I wasn't aware of was that YouTube has audio streams that are separate from the video streams.  Below is the simple script to download the audio.  Keep in mind that you'll need to provide the url of the YouTube video.  Getting the url is very simple, you need to open the video in YouTube and copy the url.  

![Screen image with url](/static/img/requiredURL.png "Required url"){ .img-fluid .post-img}

Below is the code that would download the audio from YouTube. 
```code
 from pytube import YouTube

    
 # replace the url below with the url from the sample above 
 yt = YouTube('https://www.youtube.com/watch?v=M8sfVPi7Coo')

 yt.streams \
    .filter(only_audio=True) \
    .desc() \
    .first() \
    .download()
```
The script will save the audio file to the current directory.  You can modify where the audio is saved using one of the options described in the pytube documentation.  

Pytube also includes command line utilities where you could accomplish the capture of audio only using the command below:

```code
 $ pytube https://www.youtube.com/watch?v=M8sfVPi7Coo -a
```

If you would like to download all the videos (or audio only) from a playlist, you can capture the url of the playlist and use in the script below.  Again, everything will be saved in the current directory.  
```code

 from pytube import YouTube, Playlist


 def get_playlist(name :str):
    p = Playlist(name)

    for video in p.videos:
        print(video.streams.get_highest_resolution())
        video.streams.get_highest_resolution().download()


 # Press the green button in the gutter to run the script.
 if __name__ == '__main__':
    get_playlist('https://www.youtube.com/playlist?list=PLGOeFEwUtBUiognnwEx1zKXCFymj9kxsC')

```
The last function I wanted to document is capturing the high resolution video and audio and combine them into one file using ffmpeg to merge the audio and video into one file.  

```code
 from pytube import YouTube
 import ffmpeg

 yt = YouTube('https://www.youtube.com/watch?v=O_9u1P5YjVc&list=PL4cUxeGkcC9joIM91nLzd_qaH_AimmdAR')
 print(yt.title)
 filename = yt.title + ".mp4"
 yt.streams \
     .filter(progressive=False, file_extension='mp4') \
     .order_by('resolution') \
     .desc() \
     .first() \
     .download(filename="video.mp4")
 #
 yt.streams \
    .filter(only_audio=True, file_extension='mp4', abr="128kbps")\
    .desc() \
    .first() \
    .download(filename="audio.mp4")

 input_video = ffmpeg.input('video.mp4')
 input_audio = ffmpeg.input('audio.mp4')
 ffmpeg.concat(input_video, input_audio, v=1, a=1).output(filename).run()

```
There are many, many more things that can be done with ffmpeg and pytube, but hopefully the examples above will get you started.


