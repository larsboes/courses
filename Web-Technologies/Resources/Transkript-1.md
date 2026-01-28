
Jan Stehr
0 minutes 10 seconds0:10
Jan Stehr 0 minutes 10 seconds
Ich begrüße Sie zurück zu den Web Tech Technologien und Anwendungen und unserer letzten Sitzung heute. Eine durchaus wichtige Sitzung, wo wir noch wichtige wichtige Dinge zu tun haben. Wir werden vom Vorgehen heute zunächst mal noch uns
Jan Stehr 0 minutes 29 seconds
Uns mit dem Thema des Deployments und Betriebs beschäftigen. Das heißt also, Kubernetes noch einige Dinge zu Ende bringen. Wir sind ja beim letzten Mal länger ist es her zu dem Punkt gekommen, wo wir.
Jan Stehr 0 minutes 44 seconds
schon ein Deployment vorgenommen haben. Das heißt also, wir waren in der Lage, in dem Fall 3 Webserver, 3 Pods mit Webservern rennen zu lassen in unserem Cluster. Das Problem war schlicht und einfach nur, dass wir diese Webserver nicht besonders nutzen konnten, weil wir nicht an sie rangekommen sind von außen. Das heißt, die sind nur Cluster
Jan Stehr 1 minute 4 seconds
Intern gelaufen und haben wir am Ende unserer letzten Sitzung schon kennengelernt, den Service beziehungsweise eine spezielle Art von Service und Noteport Service. Das gucken wir uns gleich noch mal kurz praktisch an, wie das aussieht, und dann kommt für Sie.
Jan Stehr 1 minute 20 seconds
Die große Übung, die große letzte Aufgabe, die wir machen zum Thema so ein Cluster eben für unsere Anwendung, die wir im Rahmen dieser Veranstaltung so nach und nach konstruiert haben, unseren Webdienst, den wollen wir auf 'nem Cluster ausrollen. Das wird sozusagen die.
Jan Stehr 1 minute 38 seconds
finale Übung, die wir hier machen, hoppla. Und das ist, sage ich jetzt ausdrücklich unterstrichen, 'ne sehr wichtige Übung insofern, weil die sehr klausurrelevant ist. Das heißt also, das Verständnis dafür, dass wir da, was wir da machen, wie das funktioniert,
Jan Stehr 1 minute 55 seconds
Wie man das aufsetzt, das ist auf alle Fälle auch noch mal ein sehr, sehr wichtiger Punkt für die Klausur. Das werden wir machen. Die Übung ist auch ein bisschen größer, gebe ich Ihnen dann auch ein bisschen mehr Zeit für. Die besprechen wir natürlich auch sorgfältig und dann, wenn wir soweit alles hinter uns gebracht haben, von den.
Jan Stehr 2 minutes 11 seconds
Inhalten unserer Veranstaltung, dann sprechen wir natürlich auch noch mal über die Klausur. Das heißt also, ich gehe einerseits die, wie hatte ich es genannt, klausurähnlichen Aufgaben, die ich Ihnen schon hochgeladen hatte, vor längerer Zeit auf Teams. Die gehen wir einmal durch. Das heißt, ich zeige Ihnen.
Jan Stehr 2 minutes 27 seconds
Was da so geantwortet werden sollte, in etwa wie das aussehen sollte von den Lösungen. Und natürlich, wenn es dazu Fragen gibt, können wir darüber sprechen. Und zu guter Letzt gebe ich Ihnen noch so ein paar Hinweise zur Prüfung, die dann.
Jan Stehr 2 minutes 43 seconds
Auf Sie zukommt, das ist so im Wesentlichen der Plan für heute.
Jan Stehr 3 hours 17 minutes 17 seconds
Bedarf skaliert, neu gestartet nach dem Absturz und so weiter. Das heißt also, da können sich zum Beispiel die Adressen im Lauf des Betriebs ändern. Adressen der Pods und der darin enthaltenen Container sind außerdem virtuelle Cluster I. P.s. Die sind nur innerhalb des Clusters bekannt und erreichbar. Das haben wir 'n paar Mal.
Jan Stehr 3 hours 17 minutes 36 seconds
Etabliert, das heißt, wollen wir die Komponenten unseres Systems nach außen erreichbar und nutzbar machen, definieren wir dafür einen Service. Der kann im hier gegebenen Fall einen Port 22.000 nach außerhalb des Clusters öffnen. So können wir NgineX Web Webserver über den Service nutzen. Kobanet stellt sicher, dass immer passende Ports den Service unterstützen.
Jan Stehr 3 hours 17 minutes 56 seconds
Sitzen, aber wir müssen uns nicht selbst laufen, um deren Zustand und Verfügbarkeit kümmern. Nein, das heißt, wir haben eine Abstraktion, sagen ja, wir bieten nach außen einen Service an, der sieht von außen auch so aus wie ein Microservice, beispielsweise, den können wir benutzen.
Jan Stehr 3 hours 18 minutes 11 seconds
Entsprechende Schnittstellen, Port und so weiter hat er alles, aber intern besteht er unter Umständen aus ganz vielen unterschiedlichen Komponenten, die durch Kubanetis gemanagt werden.
Jan Stehr 3 hours 18 minutes 22 seconds
So sieht das aus. Das Ganze so. Jetzt noch genau ganz kurz noch so ein paar Worte. Herr Alasad, jawoll.
MI
Mahmood Alasad / IFWS423C
3 hours 18 minutes 34 seconds3:18:34
Mahmood Alasad / IFWS423C 3 hours 18 minutes 34 seconds
Ähm, heißt das jetzt, dass DLS und DNS nicht relevant sind?

Jan Stehr
3 hours 18 minutes 42 seconds3:18:42
Jan Stehr 3 hours 18 minutes 42 seconds
Das heißt, es nicht unbedingt. Das, was wir hier sehen, sind, wie gesagt, Beispiele für Aufgaben. Ich sage Ihnen so ein bisschen, dass das Pflichtprogramm, was, was Sie auf alle Fälle können sollten, fasse ich noch mal gerade zu zusammen. Also,
MI
Mahmood Alasad / IFWS423C
3 hours 18 minutes 45 seconds3:18:45
Mahmood Alasad / IFWS423C 3 hours 18 minutes 45 seconds
OK.

Jan Stehr
3 hours 18 minutes 58 seconds3:18:58
Jan Stehr 3 hours 18 minutes 58 seconds
Sie sollen HTTP kennen, das heißt auch HTTP Requests Responses, wie wie sind die aufgebaut. Sie können davon ausgehen, so ähnlich wie hier in dieser Probeklausur, dass wir eine Aufgabe haben, die auf diese Playlist Applikation aufbaut. Ne, die würde ich durchaus auch in der Klausur mal
Jan Stehr 3 hours 19 minutes 18 seconds
Annehmen und sagen: "Hier, die kennen wir ja, die erweitern wir jetzt mal auf folgende Art und Weise." Sowas in der Art kann durchaus drankommen. Dann JSON, HTML, CSS, JavaScript.
Jan Stehr 3 hours 19 minutes 33 seconds
Bei JavaScript spezifisch nochmal das, was wir hier drin auch gesehen haben: dieser Event-Listener, sowas wie "Get Element by ID" und solche Sachen. Wie arbeitet man damit? Das sollten Sie auf alle Fälle sich auch nochmal angucken, weil so ähnlich wie hier auch.
Jan Stehr 3 hours 19 minutes 48 seconds
So ein kleiner Ausschnitt, ne, wo sie gegebenenfalls, also hier mussten sie was erklären in der Klausur, vielleicht müssen sie mal ein oder 2 Zeilen schreiben, ne. Ich gebe Ihnen so ein Ausschnitt und sag, erweitern Sie das mal, damit das folgendes, folgendes macht, ne, irgendetwas mit mit dem Dom macht oder so was in der Art, ne. So so.
Jan Stehr 3 hours 20 minutes 7 seconds
Ein, zwei Zeilen könnten Sie gegebenenfalls schreiben müssen, aber Kontext wie hier "Eventlistener Get Element by ID". Wie arbeite ich mit einzelnen Elementen? Wie modifiziere ich in JavaScript das DOM? Dann das DOM selber. Was ist das? Diese Struktur-Baumstruktur.
Jan Stehr 3 hours 20 minutes 24 seconds
Struktur, wie wie baut man die auf, dann die Kubanetis Begriffe, die wir so kennengelernt haben, wie hier auch, ne, da gibt es so eine ganze Reihe, die wir gesehen haben, die Nodes, die Cluster IP, die Node IP und so weiter, all diese diese Dinge, Pods und so, dass man das
Jan Stehr 3 hours 20 minutes 40 seconds
Erläutern kann Services, Volumes und so weiter, Persisten Volume Claim solche Sachen. Für die Manifests sollten Sie sich merken, weil Manifests lesen können und darstellen können, so wie wir das heute auch gemacht haben. Ne, dass man so was mal skizzieren kann.
Jan Stehr 3 hours 20 minutes 57 seconds
Wie gesagt, manifest schreiben müssen Sie nicht, aber Sie müssen sie lesen können und als so ein Diagramm darstellen können. Und dann, dass Sie sich auch noch mal klarmachen, dieses Netzwerkmodell von Kubernetes, ne, wie funktionierte das? Da haben wir jetzt mehrfach, haben Sie ja gemerkt, da kommt immer so die Frage, ne, was ist jetzt, was erreiche ich
Jan Stehr 3 hours 21 minutes 17 seconds
Eigentlich wir, so dass man sich da noch mal klar macht, was bedeutet das mit dem Cluster, dass ich da so ein virtuelles Netz drauflege, dass die Nodes einfach eingebunden werden durch kubanesisches Gemanagt werden, dass ich Pods da einfach drauf verteilen kann, derlei Dinge also.
Jan Stehr 3 hours 21 minutes 32 seconds
diese Folie, was auf das Netzwerkmodell eingeht und das ist es dann im im Wesentlichen. Was Herr Alasad eben noch gefragt hatte, so D. N. S. T. L. S. oder so, müssen Sie aber nicht die Details kennen, ne, das heißt also, Sie werden nicht.
Jan Stehr 3 hours 21 minutes 49 seconds
beispielsweise so 'n D.N.S. Baum oder so konstruieren müssen. Sie müssen auch nicht T.L.S. diese einzelnen Schritte aufschreiben müssen oder erklären müssen, ne, sondern D.N.S. und T.L.S. sollten sie wissen, was das ist, an welcher Stelle wird das wozu eingesetzt, eher
Jan Stehr 3 hours 22 minutes 9 seconds
Sowas? Nein, der Rest. Das muss man jetzt nichts auswendig lernen. Das ist das, was ich Ihnen für heute erstmal mitgeben würde.
Jan Stehr 3 hours 22 minutes 18 seconds
Wie üblich, das kennen Sie auch. Wir haben ja noch ein paar Tage bis zur Klausur und wenn Ihnen noch Fragen einfallen oder sowas, dann melden Sie sich. Ich bin natürlich nicht aus der Welt. Das heißt also, bis vor die Klausur bin ich natürlich erreichbar, wenn es irgendwelche Fragen gibt oder so, wenn noch irgendwas auftritt, einfach.
Jan Stehr 3 hours 22 minutes 36 seconds
Via Teams oder E-Mail kurz Nachricht schreiben und dann klären wir das.
Jan Stehr 3 hours 22 minutes 42 seconds
So, für die Sekunde noch.
Jan Stehr 3 hours 22 minutes 46 seconds
Einfälle, Fragen, Ideen gibt es noch etwas, was wir spontan besprechen müssen?
Jan Stehr 3 hours 22 minutes 56 seconds
Gut, dann wünsche ich Ihnen jetzt erstmal, was haben wir Montag, haben wir heute, ich wünsche Ihnen eine gute Woche. Ich drücke Ihnen natürlich auch wie gewohnt die Daumen für die Klausuren, dass das alles hinhaut und wie eben gesagt, wenn es noch Fragen gibt oder so, dann melden Sie sich einfach. Ansonsten würde ich sagen, bis dahin erstmal
Jan Stehr 3 hours 23 minutes 16 seconds
Alles Gute und viel Erfolg. Erstens Klausur, zweitens Studium und natürlich auch das reale Leben. Dann würde ich sagen, erstmal bis dahin.