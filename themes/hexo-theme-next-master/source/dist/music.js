const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    audio: [
	{
        name: "平凡之路",
        artist: '朴树',
        url: 'http://www.ytmp3.cn/down/59211.mp3',
        cover: 'http://p1.music.126.net/W_5XiCv3rGS1-J7EXpHSCQ==/18885211718782327.jpg?param=130y130',
      },
	//   {
    //     name: '这些民谣 - 一次听个够',
    //     artist: '翁大涵',
    //     url: 'http://www.ytmp3.cn/down/60222.mp3',
    //     cover: 'http://p2.music.126.net/Wx5GNJEpay2JbfVUJc4Aew==/109951163094853876.jpg?param=130y130',
    //   },
      {
        name: '生命有一种绝对',
        artist: '五月天',
        url: 'http://www.ytmp3.cn/down/49121.mp3',
        cover: 'http://www.geci345.com/wp-content/uploads/2020/02/T002R500x500M0000006MmDz4Hl2Ud-15.jpg',
      }
    ]
});