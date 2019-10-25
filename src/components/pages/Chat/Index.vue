<template>
  <div>
    <div class="koop-messenger">
      <div class="row">

        <div class="col conversations-container border-right border-very-strong border-color-1">
          <ul v-if="conversations && conversations.length > 0">
            <li v-for="(conversation, index) in conversations" class="py-3 px-2 border-bottom border-color-1"
                @click="onConversationClick(conversation, conversation.id)" v-if="conversation.person">
              {{ conversation.person.firstname | capitalize }} {{ conversation.person.lastname | capitalize }}
              <span class="float-right">{{ helpers.moment(conversation.messages[conversation.messages.length - 1].created_at).format('LT') }}</span>
            </li>
          </ul>
          <span v-else class="font-italic grey-text">Aucune conversation...
            <span class="small text-center">
              <br/>Pour en lancer une, allez sur le profil de la personne que vous souhaitez contacter et cliquez sur
              <i class="fa fa-edit"></i>
            </span>
          </span>
        </div>

        <div class="col messages-container bg-light d-flex align-items-end" :style="{'padding-bottom': padding}">
          <ul v-if="current.conversation" class="w-100">
            <li v-for="message in current.conversation.messages"
                class="message-item row w-100 text-white font-weight-bold">

              <div class="py-1 px-2 rounded mw-75"
                   :class="{'mine bg-color-1 ml-auto float-right': message.mine, 'other bg-color-3 float-left': !message.mine}">
                {{ message.message }}
              </div>
            </li>
          </ul>

          <div class="new-message-container" v-if="current.conversation">
            <div class="m-0">
              <textarea-autosize ref="messageInput" rows="1" id="message" name="message" v-model="message"
                                 @input="onMessageInput" placeholder="Message..." :max-height="200"
                                 class="w-100 p-2 m-0 border-0 bg-white"/>
              <button @click="send" class="position-absolute btn-send-message bg-color-1 text-white cursor-pointer">
                <i class="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>

    let interval = null

    import {date} from "../../../app/utils";

    export default {
        name: "Index",
        data() {
            return {
                message      : null,
                messages     : [],
                conversations: [],
                current      : { conversation: null, index: null },
                padding      : 0,
                loading      : false,
            }
        },

        mounted() {
            console.log(this.$route)
            this.init()
        },


        methods: {

            startInterval() {
                interval = setInterval(() => {
                    this.fetchMessages()
                }, 3000)
            },

            fetchMessages() {
                return new Promise((resolve, reject) => {
                    if (this.loading)
                        return resolve(true)
                    this.loading = true
                    this.api.get('/messages', 0).then((response) => {
                        this.messages = response.data.data.messages
                        this.conversations = response.data.data.conversations
                        console.log(this.current)
                        if (this.current.index)
                            this.current.conversation = this.conversations.filter((conversation) => conversation.id === this.current.index)[0]
                    }).then(
                        (response) => resolve(this.loading = false),
                        (error) => {
                            // if (error.status === 429) {
                            clearInterval(interval)
                            interval = null
                            // }
                            return reject(this.loading = false)
                        }
                    )
                })

            },

            getDateFrom(created) {
                let minutes = Math.abs(date.diff(this.helpers.moment(), this.helpers.moment(created), false)), hours
                return minutes < 60
                    ? `${parseInt(minutes)} minutes` : (hours = (minutes / 60)) < 24
                        ? `${parseInt(hours)} heures` : `${parseInt(hours / 24)} jours`
            },

            onMessageInput() {
                this.getPadding()
            },

            onConversationClick(conversation, index) {
                this.current.conversation = conversation
                this.current.index = index
                this.getPadding()
                // if (interval === null)
                //     this.startInterval()
                this.$router.push({ name: 'chat.index.params', params: { index } })
            },

            send() {
                let message = this.message
                this.current.conversation.messages.push({
                    message: this.message,
                    mine   : true
                })
                this.message = null
                this.api.post('/messages', { message: message, index: this.current.index }, 0)
                if (interval === null)
                    this.startInterval()
            },

            getPadding() {
                this.$nextTick(() => {
                    if (this.$refs.messageInput)
                        this.padding = `${this.$refs.messageInput.$el.clientHeight}px !important`
                })
            },

            loadParams() {
                if (this.$route.name === 'chat.index.params') {
                    this.current.index = this.$route.params.index
                    console.log(this.conversations.filter((conversation) => conversation.id === this.current.index)[0], this.current.index)
                    if (!this.conversations.filter((conversation) => conversation.id === this.current.index)[0])
                        this.conversations[this.current.index] = { id: this.current.index, messages: [] }
                    this.current.conversation = this.conversations.filter((conversation) => conversation.id === this.current.index)[0] || this.conversations[this.current.index]
                    return true
                }
                return false
            },

            async init() {
                await this.fetchMessages()
                if (!this.loadParams()) this.startInterval()
                this.getPadding()
            }
        }
    }
</script>

<style scoped>

  .koop-messenger {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 1052;
    background: #FFF;
  }

  ul {
    padding: 0 !important;
  }

  li {
    list-style-type: none !important;
  }

  .conversations-container {
    max-width: 200px !important;
  }

  .messages-container {
    max-width: calc(100vw - 200px) !important;
    height: 100vh;
    padding-bottom: 50px;
  }

  .message-item {
    margin-top: 5px;
    margin-bottom: 5px;
    /*max-width: 120px;*/
  }

  .new-message-container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .new-message-container .ssf-form-group .form-control, .new-message-container .ssf-form-group textarea {
    background: #fff !important;
  }

  .btn-send-message {
    padding: 0 !important;
    border: none !important;
    height: 25px;
    width: 25px;
    top: 0;
    right: 10px;
    bottom: 0;
    border-radius: 50%;
    margin-top: auto;
    margin-bottom: 8px;
  }

  .btn-send-message:focus, textarea:focus {
    outline: none !important;
  }

  .mw-75 {
    max-width: 75% !important;
  }
</style>
