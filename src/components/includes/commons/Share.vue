<template>

  <div class="share-container">
    <ul class="pl-0">

      <li v-for="(link, $idx) in links" class="py-1 share-link row">
        <!--https://www.facebook.com/sharer/sharer.php?u=http%3A//dev.keepme.ovh%3A4000-->
        <div class="share-link-icon">
          <!--<span class="fa-li">--><i :class="link.icon" class="fa-1x5"></i><!--</span>-->
        </div>
        <div class="share-link-text">
          <a :href="createLink(link.media)" :target="link.target" class="black-text">
            Partager {{ link.pre }} {{ link.media }}
          </a>
        </div>
      </li>

      <!--  <li>
          &lt;!&ndash;https://twitter.com/intent/tweet?text=tweet%20test&ndash;&gt;
          <span class="fa-li"><i class="fab fa-twitter-square fa-1x5 twitter-logo"></i></span>
          <a href="https://www.facebook.com/sharer.php?..." target="blank" rel="noopener noreferrer">
            Partager sur twitter
          </a>
        </li>

        <li>
          &lt;!&ndash;mailto:recipient@gmail.com?subject=subject&body=message&ndash;&gt;
          <span class="fa-li"><i class="fa fa-envelope fa-1x5 mail-logo"></i></span>
          <a href="https://www.facebook.com/sharer.php?..." target="blank" rel="noopener noreferrer">
            Partager par mail
          </a>
        </li>

        <li>
          <span class="fa-li"><i class="fa fa-sms fa-1x5 sms-logo"></i></span>
          <a href="sms:?&body=message">Partager par SMS</a>
        </li>-->

      <!--<li>
        &lt;!&ndash;https://twitter.com/intent/tweet?text=tweet%20test&ndash;&gt;
        <a href="https://twitter.com/intent/tweet?..." target="blank" rel="noopener noreferrer"><img
          src="twitter-icon.png" alt="Share Page on Twitter"/></a></li>
      <li>
        &lt;!&ndash;mailto:recipient@gmail.com?subject=subject&body=message&ndash;&gt;
        <a href="mailto:?subject=I wanted you to see this site&amp;body=Check out this site http://www.website.com."
           title="Share by Email">
          <img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png">
        </a></li>
      <li>
        <a href="sms:?&body=message">Text Message</a>
      </li>
      -->
      <!--      <li><a href="https://www.linkedin.com/shareArticle?..." target="blank" rel="noopener noreferrer"><img src="linkedin-icon.png" alt="Share Page on LinkedIn" /></a></li>-->
    </ul>

    <!--    <modal-share :url="url"/>-->
  </div>
</template>

<script>
    // import ModalShare from "./Share/includes/ModalShare";

    export default {
        name: "Share",
        // components: { ModalShare },
        data() {
            return {
                links: [
                    { pre: "sur", icon: "fab fa-facebook-square facebook-logo", media: "facebook", target: "_blank" },
                    { pre: "sur", icon: "fab fa-twitter-square twitter-logo", media: "twitter", target: "_blank" },
                    { pre: "par", icon: "fa fa-envelope-square mail-logo", media: "email", target: "_self" },
                    { pre: "par", icon: "fa fa-sms sms-logo", media: "sms", target: "_self" },
                ],
                url  : null
            }
        },

        methods: {

            createLink(media) {

                return media === 'facebook'
                    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
                    : media === 'twitter'
                        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(window.location.href)}`
                        : media === 'email'
                            ? `mailto:?subject=KeepMe - Une annonce pour vous&body=Regarde ce que j’ai trouvé sur KeepMe : ${window.location.href}`
                            : media === 'sms'
                                ? `sms:?&body=KeepMe - Une annonce pour vous&body=Regarde ce que j’ai trouvé sur KeepMe : ${window.location.href}`
                                : ''

                // console.log(this[`create${media.capitalize()}Link`])
                // return eval(this[`create${media.capitalize()}Link`]())
            },

        }
    }
</script>

<style scoped>

  .share-link {
    list-style-type: none;
    padding-right: 8px;
    padding-left: 8px;
  }

  .share-link:hover,
  .share-link:hover span {
    background-color: #dee2e6;
  }

  .share-link-icon {
    text-align: center;
    width: 23px;
  }

  .facebook-logo {
    color: #456db0
  }

  .twitter-logo {
    color: #51a5ef;
  }

  .mail-logo {
    color: #7d7d7d;
  }

  .sms-logo {
    color: #95D03A
  }

</style>
