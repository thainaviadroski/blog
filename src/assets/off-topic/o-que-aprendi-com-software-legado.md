# O que aprendi com software legado?
---

description: Software legado como fonte de aprendizado e as lições que ele deixa sobre decisões, refatoração e revisão de código
tags: programação, legado
date: 2026-10-14 07:49:35

## Código/Software legado

Software legado vai muito além da versão de uma tecnologia. Estamos falando sobre como a lógica de negócio foi traduzida para o código. Algo temido por uns, visto como oportunidades para outros, software legado é uma ótima fonte de aprendizado. Por mais insano que ele possa ser, fugindo dos grandes patterns, muitas vezes com arquivos de 5 mil linhas, ele te faz pensar além do código; afinal, ele reflete a tomada de decisões anteriores ao código. Ao ler linha após linha e compreender a lógica de negócios por trás desse código, vemos que nem sempre um programa é escrito pensando nas melhores práticas, seguindo guias como o Clean Code ou DDD (Domain-Driven Design). Muitas vezes ele só precisa resolver um problema específico em um determinado momento, e essa exceção fica no código até que alguém questione sobre ela.

Mas não devemos demonizar código legado, pois ele nasce de circunstâncias alheias a ele: nasce na escolha da stack do projeto, na falta de padronização, na falta de revisão do código, no "assim que der tempo eu refatoro" ou no "não vou mexer no que já está funcionando". Em meio a tudo isso, o que tirei como aprendizado: 
- Escrever código de forma objetiva é uma escolha. 
- Refatorar é essencial para manter um software vivo. 
- Tomar decisões de forma precipitada cria bugs ocultos, que irão custar caro no futuro. 
- Evoluir um projeto é essencial.
- Revisar o código vai garantir que ele foi escrito da melhor forma possível. 
