Dödsorsaker
===========


Översikt
========

Filen innehåller dödsorsaksdata från Socialstyrelsens dödsorsaksregister. Det är den underliggande 
dödsorsaken som redovisas, kodad enligt den internationella versionen av sjukdomsklassifikationen 
ICD-10. För skador redovisas den yttre orsaken till skadan. I alkohol- och drog-index inkluderas alla 
dödsfall där alkohol eller droger har omnämnts på dödsorsaksintyget. Därför inkluderas även 
bidragande dödsorsaker i dessa index. Datat omfattar avlidna under ett kalenderår som vid tidpunkten 
för dödsfallet var folkbokförda i Sverige, oavsett om dödsfallet inträffade inom eller utanför landet. I 
statistiken ingår inte dödfödda, personer som avlidit under tillfällig vistelse i Sverige eller asylsökande 
som ännu ej erhållit uppehållstillstånd. Utvandrade svenskar, som inte längre är folkbokförda i Sverige 
ingår inte heller.

Antal döda per 100 000 (dödstal)
Avser i denna redovisning antal döda per 100 000 av medelfolkmängden. Dödstal för olika 
åldersklasser beräknas separat, alltså med respektive åldersklass som population. I detta program kan 
du välja att åldersstandardisera dödstalen efter olika ålderssammansättningar.


Filinformation
==============

ZIP filen innehåller följande CSV-filer:

CSV-filer med data som innehåller fälten koder + värde:
dödsorsaker - data - antal döda - *.csv
dödsorsaker - data - antal döda per 100 000 - *.csv

CSV-filer med meta som innehåller fälten kod + text:
dödsorsaker - meta - diagnoser (ICD-10).csv
dödsorsaker - meta - kön.csv
dödsorsaker - meta - mått.csv
dödsorsaker - meta - regioner.csv
dödsorsaker - meta - åldrar.csv

CSV-filerna är semikolonseparerade med teckenkodning UTF-8.
Första raden i CSV-filerna innehåller en rubrikrad.

Kopplingen mellan CSV-filerna görs med hjälp av fälten med koder.
Till exempel är koderna i fältet Kön samma i filen "dödsorsaker - data - antal döda - *.csv"
som i filen "dödsorsaker - meta - kön.csv".
Så för att koppla texten för kön till filen med data så kopplas de ihop med hjälp av fältet Kön i båda filerna.


Detaljerad filinformation
=========================

Filen "dödsorsaker - data - antal döda - *.csv"
Innehåller fälten "Mått;År;Region;Diagnos;Kön;Ålder;Värde".
Mått, innehåller heltal, 1 tecken.
År, innehåller årtal, 4 tecken.
Region, innehåller heltal, max 2 tecken.
Diagnos, innehåller text, max 7 tecken
Kön, innehåller heltal, 1 tecken.
Ålder, innehåller heltal, max 2 tecken.
Värde, innehåller heltal.

Filen "dödsorsaker - data - antal döda per 100 000 - *.csv"
Innehåller fälten "Mått;År;Region;Diagnos;Kön;Ålder;Värde".
Mått, innehåller heltal, 1 tecken.
År, innehåller årtal, 4 tecken.
Region, innehåller heltal, max 2 tecken.
Diagnos, innehåller text, max 7 tecken
Kön, innehåller heltal, 1 tecken.
Ålder, innehåller heltal, max 2 tecken.
Värde, innehåller decimaltal.

Även rader som saknar ett värde finns med. Fältet Värde är då tomt.
Till exempel en rad med värde: "2;2014;0;A00-B99;1;18;551,65"
Och samma rad fast utan värde: "2;2014;0;A00-B99;1;18;"

Filen "dödsorsaker - meta - diagnoser (ICD-10).csv"
Innehåller fälten "Diagnos;Text"
Diagnos, innehåller text, max 7 tecken
Text, innehåller text, max 192 tecken

Filen "dödsorsaker - meta - kön.csv"
Innehåller fälten "Kön;Text"
Kön, innehåller heltal, 1 tecken.
Text, innehåller text, max 10 tecken.

Filen "dödsorsaker - meta - mått.csv"
Innehåller fälten "Mått;Text"
Mått, innehåller heltal, 1 tecken.
Text, innehåller text, max 22 tecken.

Filen "dödsorsaker - meta - regioner.csv"
Innehåller fälten "Region;Text"
Region, innehåller heltal, max 2 tecken.
Text, innehåller text, max 20 tecken.

Filen "dödsorsaker - meta - åldrar.csv"
Innehåller fälten "Ålder;Text"
Ålder, innehåller heltal, max 2 tecken.
Text, innehåller text, max 20 tecken.


Vid användning av uppgifterna
=============================

Ange källa:
Dödsorsaker [Socialstyrelsens statistikdatabas]. Stockholm: Socialstyrelsen. [citerad: datum och klockslag]. 
Tillgänglig från: Länk till ”För utvecklare”
