# Performance

Cíl je jednoduchý: stránka má působit rychle ještě předtím, než se načte úplně všechno.

## Co pomáhá

- lehký shell bez zbytečného JS
- standardní MkDocs search
- optimalizované SVG assety
- co nejméně custom skriptů
- rozumný počet stránek v navigaci

## Loading strategie

1. nejdřív header, sidebar a obsahový rámec
2. potom hlavní text
3. nakonec doplňky a nízkoprioritní prvky

## Skeleton přístup

Pokud přidáš vlastní interaktivní bloky, skeleton by měl kopírovat jejich finální rozměr.

!!! tip
    Nejlepší performance trik bývá ten nejméně sexy: nechat UI lehké.
