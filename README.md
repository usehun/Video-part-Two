# Video-part-Two
nomard Youtube Code Challenge 11

```
(1) 현재 시간 표시 (1-1) loadedmetadata 이벤트
    video.addEventListener("loadedmetadata", handleTotalTime)
    loadedmetadata는 비디오 오브젝트의 이벤트로 meta data가 로드될 때 실행됩니다.

(1-2) 시간 포맷
    const timeFormat = (seconds) => new Date(seconds * 1000).toISOString().substr(11, 8)
    timeFormat은 seconds를 받아서 new Date(seconds)를 반환합니다.
    Date()는 현재 시간을 알려주는 자바스크립트의 함수로, 컴퓨터의 제로 타임을 기준으로 밀리초(ms)를 추가할 수 있습니다.
    예를 들어, 제로 타임으로부터 20초 뒤의 값을 알고 싶다면 New Date(20*1000)을 입력하면 됩니다.
    값을 String으로 가져오기 위해 toISOString()을 호출하면 "1970-01-01T00:00:20.000Z"이라는 값이 나옵니다.
    이 값에 substr(from, ?length)를 호출하여 시작점에서 원하는 길이만큼 자를 수 있습니다.
    비디오 컨트롤러에서는 시간만 표시하면 되기 때문에, 11번째 글자 다음부터 8글자만 필요합니다. substr(11, 8)라고 작성하면 됩니다.
    (주의) 그런데 이 기능은 더 이상 권장하는 기능은 아닙니다. 
    일부 브라우저는 여전히 이 기능을 지원하지만, 관련 웹 표준에서 이미 제거되었거나 삭제 중이어서 호환성 목적으로만 유지할 수 있으니 참고하시기 바랍니다.

(1-3) 비디오의 총 시간을 구하는 handleTotalTime 핸들러
    handleTotalTime 핸들러는 비디오의 현재 시간을 구해 타임라인에 표시합니다.
    totalTime.innerText = timeFormat(Math.floor(video.duration))
    video.duration()을 사용하여 비디오의 길이를 구한 후 포맷하여 총 시간을 업데이트하면 됩니다.
    timeline.max = Math.floor(video.duration)
    비디오 레인지의 maximum value가 비디오 길이가 되도록 세팅합니다. min, max가 있어야 어디가 시작이고 어디가 끝인지 알 수 있기 때문에 반드시 설정해 주어야 합니다.
    html에서 마크업으로 작성한 input의 step은 타임라인의 밸류가 얼마씩 증가할지 세팅하는 것을 돕습니다.

(1-4) Timeupdate 이벤트
    video.addEventListener("timeupdate", handleCurrentTIme)
    timeupdate는 비디오의 시간이 변할 때마다 실행됩니다.

(1-5) 현재 시간을 핸들링하는 handleCurrentTIme 핸들러
    currentTime.innerText = timeFormat(Math.floor(video.currentTime))
    먼저 시간 포맷하는 함수에 비디오의 현재 초(s)를 보내줍니다.
    timeline.value = Math.floor(video.currentTime)
    비디오의 현재 시간이 변할 때마다 타임라인의 레인지 값도 변하게 하면 됩니다.

(2) 타임라인(비디오 진행 상태, 클릭 시 점프)
    비디오가 얼마나 진행되었느냐에 따라 표시되는 range 값도 달라집니다. 사용자가 range 값의 다른 부분을 클릭하면 해당하는 초로 새로 고침 되어야 합니다.

(2-1) input 이벤트
    timeline.addEventListener("input", handleTimeline)
    input 이벤트는 value 값이 바뀔 때마다 이벤트가 실행되기 때문에 이 이벤트를 사용하여 타임라인의 range 값을 구할 수 있습니다.

(2-2) handleTimeline 핸들러
    video.currentTime = value;
    Input 이벤트의 target.value로 range의 value을 가져오고, 비디오의 현재 시간을 input 이벤트에서 가져온 value로 업데이트합니다.

(3) 전체 화면

(3-1) click 이벤트
    fullScreenBtn.addEventListener("click", handleFullScreen)
    전체 화면 버튼을 클릭하면 handleFullScreen 핸들러를 호출합니다.

(3-2) handleFullScreen 핸들러
    const fullscreen = document.fullscreenElement로 풀스크린을 정의합니다.
    If else 구문을 이용해 fullscreen 상태라면 document.exitFullscreen()로 풀스크린을 벗어나고, 풀스크린 아이콘으로 모양을 바꾸면 됩니다.
    fullscreen 상태가 아니라면 videoContainer.requestFullscreen()로 풀스크린으로 들어가고, 풀스크린을 벗어나는 아이콘으로 모양을 바꾸면 됩니다.
    (주의) 풀스크린을 요청할 때는 element에 요청하지만, 종료할 때는 document에 요청합니다.

(4) 단축키: Space를 눌러 일시 중지, 'F'를 눌러 전체 화면 모드로 들어가기, Esc 키를 눌러 전체 화면 모드에서 나오기

(4-1) keyup 이벤트
    window.addEventListener("keyup", handleKeyboard)
    keyup 이벤트를 사용하면 눌러지는 event.key로 눌러지는 키값을 알 수 있습니다. 이 이벤트를 사용하여 비디오 플레이어에서 단축키를 사용하면 됩니다.

(4-2) handleKeyboard 핸들러
    const handleKeyboard = (e) => {}
    event.key 값을 사용하기 위해 event를 인자로 보냅니다.
    “Space” 키를 눌러 일시정지/재생이 되도록 하려면, (e.key === " ")일 때 handlePlayAndStop()를 호출하면 됩니다.
    “F” 키를 눌러 전체 화면 모드로 들어가게 하려면, (e.key === "f")일 때 videoContainer.requestFullscreen()를 호출하고 풀스크린 아이콘 모양을 변경해 주면 됩니다.
    “Esc” 키를 눌러 전체 화면 모드에서 나오려면, (e.key === "Escape")일 때 document.exitFullscreen()를 호출하고 풀스크린 아이콘 모양을 변경해 주면 됩니다.
```
