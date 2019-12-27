<template>
    <div class="outer">
        <main class="main">
            <audio-player :resource="resource" />
        </main>
    </div>
</template>
<script>
import audioPlayer from './components/audioPlayer';
const mediaList = [
    {
        url: 'http://test001.pnlyy.com/2bmb6bzbvbpbbb3bdbsb1bubgb0b9bkb4bebfbjbnb8bobqb5bwblb7bxbhbybibrbabcbt',
        name: 'Cantos De Sirena (con A. Serrano)',
        singer: 'Inma Serrano',
        cover: 'http://test001.pnlyy.com/5i1i0iwipieimiqiaibiciri4i2iiidigi6itikivisi9ixijiliuioinihi3i7iyi8izif'
    },
    {
        url: 'http://test001.pnlyy.com/vyfygyoyqycy3ydy2y1ysyjyny6yeykypy8yry4ybymyiyyy7ywy0y5yayuyzyxytyhyly9',
        name: 'MMX',
        singer: 'enigma',
        cover: 'http://test001.pnlyy.com/ev2vdv9v6vuvwvcvvvjvtvbvsv4v1vmvyvovav0vxvivzvhvlvrv7vpvkvfvqv5v8vnvgv3'
    },
    {
        url: 'http://test001.pnlyy.com/z2g2e2j272i2f2o2v2x222l2r2h2w24252b2n202u2q292y21262p232t2d2c2m2a282s2k',
        name: 'A Night to Remember',
        singer: 'Liberty X',
        cover: 'http://test001.pnlyy.com/fk7klkck8kwkrkakmkjkdkhkvk9kgk5kkkqk1kskik4kukykxknk0k2kokpktk6k3kzkbke'
    },
    {
        url: 'http://test001.pnlyy.com/hj6j1jojkjijejtjdjsjljjj4j8jqjnjcjfj3jgj2jwjajujzj5jbjyj9jvjrjmj7j0jpjx',
        name: 'The Next Episode',
        singer: 'Dr. Dre,Snoop Dogg',
        cover: 'http://test001.pnlyy.com/xnzninvn6nsnlnrnnn5ncnhnwngndnyn1nmnan7nbnfn4non8n0nun3nkn2ntn9njnqnenp'
    },
    {
        url: 'http://test001.pnlyy.com/kdcd0dtdqd4didodhd1dud6drdldsd3dvdzdadxdpdedydwdgdfd2d9d7dbddd5dmd8dndj',
        name: '楽园',
        singer: '平井堅',
        cover: 'http://test001.pnlyy.com/62c2l2m2w2z2j2q2h2i2a2b242g202325292d2p2y21222f2v272e2t2n2k282u2x2r2o2s'
    },
    {
        url: 'http://test001.pnlyy.com/va4awa3araga7a8apaeayaaa0atalaqabadahaia5axasaoa1akamafajaua6acazana9a2',
        name: 'Sleeping Child',
        singer: 'Michael Learns To Rock',
        cover: 'http://test001.pnlyy.com/okzkpkikykwkdkuktkjkskxkqk3kfk6krkkkakek0khkvklkmk2k9knk8kgk1kbk4k7kck5'
    }
];
export default {
    name: 'audio-player-info',
    data() {
        return {
            resource: mediaList
        }
    },
    components: {
        audioPlayer
    },
    methods:{

    },
    mounted(){

    },
}
</script>

<style lang="less" scoped>
@import '../../assets/css/mixin.less';
// .outer {
//     position: relative;
//     .wh(100%, 100vh);
//     background-color: #f6f6f6;
// }
.outer {
    .fj();
    .flex-align(flex-start);
    position: relative;
    // padding: .5rem;
    // margin: auto;
    .wh();
    .main {
        // .box-flex(1);
        // height: 100%;
        .wh();
        // box-shadow: 0 1px 3px rgba(0,0,0, .1);
    }
}

</style>