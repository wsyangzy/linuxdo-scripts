<template>
  <div class="item">
    <div class="tit">{{ sort }}. 是否显示始皇酱表情包</div>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </div>
</template>

<script>
const emojiSet = [
  {
    packet: 1,
    name: "开心",
    url:
      "https://linux.do/uploads/default/original/4X/5/d/2/5d203e597d8674c8859f32408fc9ccd36118f074.jpeg",
  },
  {
    packet: 2,
    name: "无语",
    url:
      "https://linux.do/uploads/default/original/4X/7/9/f/79f43fc1cc1cc19f2b8753f6360ecff1f625ac21.jpeg",
  },
  {
    packet: 3,
    name: "满足",
    url:
      "https://linux.do/uploads/default/original/4X/5/a/a/5aa849882b1acd9ed46fcfccc2c36aca3c32b576.jpeg",
  },
  {
    packet: 4,
    name: "调皮",
    url:
      "https://linux.do/uploads/default/original/4X/9/3/d/93db9ed78e08426ab8694030b38fa435d58b516b.jpeg",
  },
  {
    packet: 5,
    name: "思考",
    url:
      "https://linux.do/uploads/default/original/4X/0/0/b/00b26a0bf5e6d347f74c5d7fcb893ea0bf59f709.jpeg",
  },
  {
    packet: 6,
    name: "恐惧",
    url:
      "https://linux.do/uploads/default/original/4X/f/2/8/f285ea7eebd13221bd9ee340fa7104fd42dd102a.jpeg",
  },
  {
    packet: 7,
    name: "疑惑",
    url:
      "https://linux.do/uploads/default/original/4X/f/3/1/f3154aa2c232a3badc6c651edc9f832abc983d51.jpeg",
  },
  {
    packet: 8,
    name: "委屈",
    url:
      "https://linux.do/uploads/default/original/4X/1/c/b/1cb69d62d240250ed471dce9fa23aaa5e8d90cdb.jpeg",
  },
  {
    packet: 9,
    name: "得意",
    url:
      "https://linux.do/uploads/default/original/4X/3/7/5/3751e8671272f13b9459d75afea7b5c753fcdbdf.jpeg",
  },
  {
    packet: 10,
    name: "爱心",
    url:
      "https://linux.do/uploads/default/original/4X/a/5/a/a5a28c56591b39b58ae59f4b84ac51877c768e37.jpeg",
  },
  {
    packet: 11,
    name: "兴奋",
    url:
      "https://linux.do/uploads/default/original/4X/6/7/7/6771733d4176267d9a0a694d632544240a7e359b.jpeg",
  },
  {
    packet: 12,
    name: "困倦",
    url:
      "https://linux.do/uploads/default/original/4X/a/c/3/ac3857beb73643a37c02fb7c8ae3ba09bb449113.jpeg",
  },
  {
    packet: 13,
    name: "害羞",
    url:
      "https://linux.do/uploads/default/original/4X/5/a/e/5ae2f48ee13b6361ae7d74a576747d50e78b40f4.jpeg",
  },
  {
    packet: 14,
    name: "生气",
    url:
      "https://linux.do/uploads/default/original/4X/f/5/5/f552002bb04ab67e75783bb4811fea184c6f1784.jpeg",
  },
  {
    packet: 15,
    name: "惊讶",
    url:
      "https://linux.do/uploads/default/original/4X/5/f/c/5fc75f5ddd33027a8936a6c37132c410bac8e411.jpeg",
  },
  {
    packet: 16,
    name: "悲伤",
    url:
      "https://linux.do/uploads/default/original/4X/4/a/0/4a08ad7ba72beb50d5b4d003c8322fef7e1161a7.jpeg",
  },
];

export default {
  data() {
    return {
      emojiTimer: null,
    };
  },
  props: ["modelValue", "sort"],
  emits: ["update:modelValue"],
  created() {
    if (this.modelValue) {
      this.setupEmojiButton();
    }
  },
  methods: {
    setupEmojiButton() {
      this.emojiTimer = setInterval(() => {
        var editor = document.querySelector(".d-editor-button-bar");
        if (!document.querySelector(".emoji-picker-button-neo") && editor) {
          var emojiButtonNeo = document.createElement("button");
          emojiButtonNeo.classList.add(
            "btn",
            "no-text",
            "btn-icon",
            "emoji",
            "emoji-picker-button-neo"
          );
          emojiButtonNeo.title = "插入始皇酱表情包";
          emojiButtonNeo.innerHTML = "Neo";
          editor.appendChild(emojiButtonNeo);
          emojiButtonNeo.addEventListener("click", function () {
            var emojiPickerNeo = document.createElement("div");
            emojiPickerNeo.className = "emojiPickerNeo";
            var emojiSetHtml = emojiSet
              .map(
                (emo) =>
                  `<img src="${emo.url}" name="${emo.name}" url="${emo.url}" alt="${emo.name}" onclick="insertEmojiNeo(event)"/>`
              )
              .join("");
            emojiPickerNeo.innerHTML = emojiSetHtml;
            emojiPickerNeo.style.position = "absolute";
            emojiPickerNeo.style.background = "#FFF";
            emojiPickerNeo.style.border = "1px solid #ddd";
            emojiPickerNeo.style.padding = "10px";
            if (document.body.contains(document.querySelector(".emojiPickerNeo"))) {
              document.querySelector(".emojiPickerNeo").remove();
            } else {
              emojiButtonNeo.after(emojiPickerNeo);
            }
            emojiPickerNeo.addEventListener("click", function (e) {
              if (e.target.tagName === "IMG") {
                var textAreaNeo = document.querySelector(".d-editor-input");
                if (!textAreaNeo) {
                  alert("找不到输入框");
                  return;
                }
                var emojiMarkdownNeo = `![${e.target.name}|1024x1536,10%](${e.target.src})`;
                // var emojiMarkdownNeo = `![${e.target.name}](${e.target.src}) `;

                // 在光标位置插入表情包
                var startPosNeo = textAreaNeo.selectionStart;
                var endPosNeo = textAreaNeo.selectionEnd;
                textAreaNeo.value =
                  textAreaNeo.value.substring(0, startPosNeo) +
                  emojiMarkdownNeo +
                  textAreaNeo.value.substring(endPosNeo, textAreaNeo.value.length);
                // 触发输入事件
                var event = new Event("input", {
                  bubbles: true,
                  cancelable: true,
                });
                textAreaNeo.dispatchEvent(event);
                // 隐藏选择器
                emojiPickerNeo.remove();
              }
            });
          });
        }
      }, 100);
    },
  },
  beforeUnmount() {
    if (this.emojiTimer) {
      clearInterval(this.emojiTimer);
      this.emojiTimer = null;
    }
  },
  beforeDestroy() {
    if (this.emojiTimer) {
      clearInterval(this.emojiTimer);
      this.emojiTimer = null;
    }
  },
};

// 为了保持原有功能，保留全局的表情插入函数
window.insertEmojiNeo = function (event) {
  var textAreaNeo = document.querySelector(".d-editor-input");
  if (!textAreaNeo) {
    alert("找不到输入框");
    return;
  }
  var emojiMarkdownNeo = `:${event.target.getAttribute("name")}: `;

  // 在光标位置插入表情包
  var startPosNeo = textAreaNeo.selectionStart;
  var endPosNeo = textAreaNeo.selectionEnd;
  textAreaNeo.value =
    textAreaNeo.value.substring(0, startPosNeo) +
    emojiMarkdownNeo +
    textAreaNeo.value.substring(endPosNeo, textAreaNeo.value.length);

  // 触发输入事件
  var inputEventNeo = new Event("input", {
    bubbles: true,
    cancelable: true,
  });
  textAreaNeo.dispatchEvent(inputEventNeo);

  // 隐藏选择器
  if (document.querySelector(".emojiPickerNeo")) {
    document.querySelector(".emojiPickerNeo").remove();
  }
};
</script>
