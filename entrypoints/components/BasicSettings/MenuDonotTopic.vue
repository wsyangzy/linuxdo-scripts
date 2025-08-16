<template>
  <div class="item">
    <div class="tit">
      {{ sort }}. 列表快速免打扰帖子
      <a href="https://linux.do/latest?state=muted" style="color: #e00; margin-left: 10px"
        >&lt;免打扰列表&gt;</a
      >
    </div>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
  </div>
</template>

<script>
import $ from "jquery";
export default {
  props: ["modelValue", "sort"],
  emits: ["update:modelValue"],
  data() {
    return {
      observer: null,
      eventHandlersAttached: false, // Flag to ensure handlers are attached only once
    };
  },
  methods: {
    // 提示组件
    messageToast(message) {
      const messageElement = document.createElement("div");
      messageElement.className = "messageToast-text";
      messageElement.innerText = message;
      document.getElementById("messageToast").appendChild(messageElement);
      setTimeout(() => {
        messageElement.remove();
      }, 3000);
    },
    init() {
      if (!isMutedPostPage) {
        $(".topic-list .main-link a.title").each(function () {
          const id = $(this).attr("data-topic-id");
          if ($(this).parents(".link-top-line").find(".donottopic-btn").length < 1) {
            $(this)
              .parents(".link-top-line")
              .append(
                `<button class="btn btn-icon-text btn-default donottopic-btn donottopic-${id}" data-id="${id}">免打扰</button>`
              );
          }
        });
      } else {
        $(".topic-list .main-link a.title").each(function () {
          const id = $(this).attr("data-topic-id");
          if (
            $(this).parents(".link-top-line").find(".removedonottopic-btn").length < 1
          ) {
            $(this)
              .parents(".link-top-line")
              .append(
                `<button class="btn btn-icon-text btn-default removedonottopic-btn removedonottopic-${id}" data-id="${id}">移出免打扰</button>`
              );
          }
        });
      }
    },
    // This function attaches the event handlers
    attachEventHandlers() {
        if(this.eventHandlersAttached) return; // Don't attach more than once

        function getCSRFToken() {
            return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
        }
        let vm = this;

        // Using event delegation on document, so it only needs to be attached once.
        // Click "Do Not Disturb"
        $(document).on("click", ".donottopic-btn", function () {
            const formData = new FormData();
            formData.append("notification_level", 0);
            const topicId = $(this).attr("data-id");

          return new Promise((resolve, reject) => {
            // 发送带有 CSRF Token 的 POST 请求
            fetch(`https://linux.do/t/${topicId}/notifications`, {
              method: "POST",
              body: formData,
              headers: {
                "X-CSRF-Token": getCSRFToken(), // CSRF 令牌
                "X-Requested-With": "XMLHttpRequest", // 表明这是 XMLHttpRequest 请求
              },
              credentials: "include", // 附带 cookie
            })
              .then((response) => {
                if (!response.ok) {
                  reject(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then(() => {
                $(this).parents(".topic-list-item").remove();
                vm.messageToast("帖子已设为免打扰！");
                resolve();
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });

        // Click "Remove from Do Not Disturb"
        $(document).on("click", ".removedonottopic-btn", function () {
            const formData = new FormData();
            formData.append("notification_level", 1);
            const topicId = $(this).attr("data-id");

          return new Promise((resolve, reject) => {
            // 发送带有 CSRF Token 的 POST 请求
            fetch(`https://linux.do/t/${topicId}/notifications`, {
              method: "POST",
              body: formData,
              headers: {
                "X-CSRF-Token": getCSRFToken(), // CSRF 令牌
                "X-Requested-With": "XMLHttpRequest", // 表明这是 XMLHttpRequest 请求
              },
              credentials: "include", // 附带 cookie
            })
              .then((response) => {
                if (!response.ok) {
                  reject(`HTTP error! status: ${response.status}`);
                }
                return response.json();
              })
              .then(() => {
                $(this).parents(".topic-list-item").remove();
                vm.messageToast("帖子已移出免打扰！");
                resolve();
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });

        this.eventHandlersAttached = true; // Set flag
    }
  },
  created() {
    if (this.modelValue) {
      // Attach event handlers ONCE
      this.attachEventHandlers();

      // Run button adder once initially
      this.addButtons();

      // Set up observer to run button adder on DOM changes
      this.observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.addedNodes.length) {
            this.addButtons();
            // We only need to find new nodes, so we can break after finding them.
            break;
          }
        }
      });

      const targetNode = document.querySelector('body');
      const config = { childList: true, subtree: true };
      this.observer.observe(targetNode, config);
    }
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect();
    }
    // Note: Delegated event handlers on `document` are not removed,
    // which is generally fine for a content script that lives with the page.
    // If this component could be mounted/unmounted multiple times,
    // we would need to add logic to remove them (`$(document).off(...)`).
  },
  beforeDestroy() {
    this.beforeUnmount();
  }
};
</script>