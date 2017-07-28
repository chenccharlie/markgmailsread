function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate()
      .setTitle('Mark All Gmails Read')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

/**
 * Marks Gmails under the label to be read.
 * @param {String} label The label to be marked as read.
 */
function markRead(label) {
  var threads = getUnreadThreads(label);
  while (threads.length > 0) {
    GmailApp.markThreadsRead(threads.slice(0, 100));
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
