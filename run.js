#!/usr/bin/jjs -fv

var baseName = "hero-command";
var startHeroCommand = "kubectl get deployment -l name=" + baseName + ",version!=" + $ENV.VERSION;
$EXEC(startHeroCommand);
print($OUT);
print($ERR);

var testUrl = "curl --write-out %{http_code} --silent --output /dev/null http://adesso.disruptor.ninja:30080/hero-command/resources/heros";
$EXEC(testUrl);
while ($OUT != "200") {
    $EXEC("sleep 1");
    $EXEC(testUrl);
    print($OUT);
}
