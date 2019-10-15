var sla = new GlideRecord('task_sla');
sla.addQuery('task.numberISNOTEMPTY^stage!=cancelled^has_breached=true^slaLIKEresolution^ORslaLIKErequest^slaNOT LIKETEST^task.numberSTARTSWITHinc');
sla.query();
gs.info(sla.getRowCount());
var i = 0;

var tasks = [];

while(sla.next()) {
  tasks.push(sla.task.number);
}
var grTask = new GlideRecord('task');
tasks.forEach(function(task) {
  if(grTask.get('number', task)) {
    grTask.u_sla_breached = true;
    grTask.setWorkflow(false);
    grTask.update();
}})