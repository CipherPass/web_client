import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
import { BACKEND_URL } from '../constants'

const WebSocketUtil = {
  socketEndpoint: `${BACKEND_URL}/websocket`,
  stompClient: null,

  connectWebSocket: (uuid, onUpdate) => {
    const socket = new SockJS(`${BACKEND_URL}/websocket`)
    const client = Stomp.over(socket)
    client.debug = () => {}

    client.connect({}, function () {
      console.log('StompJs connected to broker over ws')
      client.subscribe(`/submittion_run/${uuid}`, (message) => {
        message = JSON.parse(message.body)
        console.log(message)
        onUpdate(message)
        // onUpdate(message);

        // if(message.updateType === 'Done'){
        //     client.disconnect();
        //     onConnectionClose();
        // }
      })
    })
    socket.onclose = console.log
  },

  sendCodeSubmissionRequest: async (
    problemSlug,
    { code, languageSlug },
    onUpdate,
    onFailure
  ) => {
    try {
      const payload = {
        problemSlug,
        languageSlug,
        code,
        testCases: [],
      }
      console.log(payload)
      const response = await fetch(
        `${BACKEND_URL}/api/problems/${problemSlug}/submittions_run`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      if (!response.ok) {
        throw response
      }

      const submissionInfo = await response.json()
      console.log(submissionInfo)

      // Connect to WebSocket using the received UUID
      WebSocketUtil.connectWebSocket(submissionInfo.uuid, onUpdate)
    } catch (error) {
      onFailure(error)
    }
  },

  closeWebSocket: () => {
    if (WebSocketUtil.stompClient && WebSocketUtil.stompClient.connected) {
      WebSocketUtil.stompClient.disconnect(() => {
        console.log('WebSocket connection closed')
      })
    }
  },
}

export default WebSocketUtil
