D�dsorsaker
===========


�versikt
========

Filen inneh�ller d�dsorsaksdata fr�n Socialstyrelsens d�dsorsaksregister. Det �r den underliggande 
d�dsorsaken som redovisas, kodad enligt den internationella versionen av sjukdomsklassifikationen 
ICD-10. F�r skador redovisas den yttre orsaken till skadan. I alkohol- och drog-index inkluderas alla 
d�dsfall d�r alkohol eller droger har omn�mnts p� d�dsorsaksintyget. D�rf�r inkluderas �ven 
bidragande d�dsorsaker i dessa index. Datat omfattar avlidna under ett kalender�r som vid tidpunkten 
f�r d�dsfallet var folkbokf�rda i Sverige, oavsett om d�dsfallet intr�ffade inom eller utanf�r landet. I 
statistiken ing�r inte d�df�dda, personer som avlidit under tillf�llig vistelse i Sverige eller asyls�kande 
som �nnu ej erh�llit uppeh�llstillst�nd. Utvandrade svenskar, som inte l�ngre �r folkbokf�rda i Sverige 
ing�r inte heller.

Antal d�da per 100 000 (d�dstal)
Avser i denna redovisning antal d�da per 100 000 av medelfolkm�ngden. D�dstal f�r olika 
�ldersklasser ber�knas separat, allts� med respektive �ldersklass som population. I detta program kan 
du v�lja att �ldersstandardisera d�dstalen efter olika �lderssammans�ttningar.


Filinformation
==============

ZIP filen inneh�ller f�ljande CSV-filer:

CSV-filer med data som inneh�ller f�lten koder + v�rde:
d�dsorsaker - data - antal d�da - *.csv
d�dsorsaker - data - antal d�da per 100 000 - *.csv

CSV-filer med meta som inneh�ller f�lten kod + text:
d�dsorsaker - meta - diagnoser (ICD-10).csv
d�dsorsaker - meta - k�n.csv
d�dsorsaker - meta - m�tt.csv
d�dsorsaker - meta - regioner.csv
d�dsorsaker - meta - �ldrar.csv

CSV-filerna �r semikolonseparerade med teckenkodning UTF-8.
F�rsta raden i CSV-filerna inneh�ller en rubrikrad.

Kopplingen mellan CSV-filerna g�rs med hj�lp av f�lten med koder.
Till exempel �r koderna i f�ltet K�n samma i filen "d�dsorsaker - data - antal d�da - *.csv"
som i filen "d�dsorsaker - meta - k�n.csv".
S� f�r att koppla texten f�r k�n till filen med data s� kopplas de ihop med hj�lp av f�ltet K�n i b�da filerna.


Detaljerad filinformation
=========================

Filen "d�dsorsaker - data - antal d�da - *.csv"
Inneh�ller f�lten "M�tt;�r;Region;Diagnos;K�n;�lder;V�rde".
M�tt, inneh�ller heltal, 1 tecken.
�r, inneh�ller �rtal, 4 tecken.
Region, inneh�ller heltal, max 2 tecken.
Diagnos, inneh�ller text, max 7 tecken
K�n, inneh�ller heltal, 1 tecken.
�lder, inneh�ller heltal, max 2 tecken.
V�rde, inneh�ller heltal.

Filen "d�dsorsaker - data - antal d�da per 100 000 - *.csv"
Inneh�ller f�lten "M�tt;�r;Region;Diagnos;K�n;�lder;V�rde".
M�tt, inneh�ller heltal, 1 tecken.
�r, inneh�ller �rtal, 4 tecken.
Region, inneh�ller heltal, max 2 tecken.
Diagnos, inneh�ller text, max 7 tecken
K�n, inneh�ller heltal, 1 tecken.
�lder, inneh�ller heltal, max 2 tecken.
V�rde, inneh�ller decimaltal.

�ven rader som saknar ett v�rde finns med. F�ltet V�rde �r d� tomt.
Till exempel en rad med v�rde: "2;2014;0;A00-B99;1;18;551,65"
Och samma rad fast utan v�rde: "2;2014;0;A00-B99;1;18;"

Filen "d�dsorsaker - meta - diagnoser (ICD-10).csv"
Inneh�ller f�lten "Diagnos;Text"
Diagnos, inneh�ller text, max 7 tecken
Text, inneh�ller text, max 192 tecken

Filen "d�dsorsaker - meta - k�n.csv"
Inneh�ller f�lten "K�n;Text"
K�n, inneh�ller heltal, 1 tecken.
Text, inneh�ller text, max 10 tecken.

Filen "d�dsorsaker - meta - m�tt.csv"
Inneh�ller f�lten "M�tt;Text"
M�tt, inneh�ller heltal, 1 tecken.
Text, inneh�ller text, max 22 tecken.

Filen "d�dsorsaker - meta - regioner.csv"
Inneh�ller f�lten "Region;Text"
Region, inneh�ller heltal, max 2 tecken.
Text, inneh�ller text, max 20 tecken.

Filen "d�dsorsaker - meta - �ldrar.csv"
Inneh�ller f�lten "�lder;Text"
�lder, inneh�ller heltal, max 2 tecken.
Text, inneh�ller text, max 20 tecken.


Vid anv�ndning av uppgifterna
=============================

Ange k�lla:
D�dsorsaker [Socialstyrelsens statistikdatabas]. Stockholm: Socialstyrelsen. [citerad: datum och klockslag]. 
Tillg�nglig fr�n: L�nk till �F�r utvecklare�
