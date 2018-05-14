function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('Mark All Gmails Read')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Marks Gmails under the label to be read.
 * @param {String} label The label to be marked as read.
 * @param {Boolean} whether to reverse the marking.
 */
function markRead(label, reverseOption) {
  var threads = getUnreadThreads(label);
  while (threads.length > 0) {
    if (reverseOption) {
      for (var i = (threads.length - 1) / 100; i >= 0; i--) {
        GmailApp.markThreadsRead(threads.slice(i * 100, (i+1) * 100));
      }
    } else {
      for (var i = 0; i < threads.length / 100; i++) {
        GmailApp.markThreadsRead(threads.slice(i * 100, (i+1) * 100));
      }
    }
    threads = getUnreadThreads(label);
  }
}

/**
 * Get all unread threads under a label.
 * @param {String} label The label to be queried.
 * @return {Array.<Object>} The unread threads.
 */
function getUnreadThreads(label) {
  if (label == "*") {
    label = "";
  }
  var query = "label:" + label + " is:unread";
  return GmailApp.search(query);
}
