# Orientação a Objetos.
---

description: Construção de sistemas com a orientação a objetos
tags: arquitetura de software, programação, oop
date: 2026-09-23 23:00:00

A programação orientada a objetos surgiu em resposta a necessidade de escrever codigo de forma natural, além de permitir modelodar os dados de forma mais coesa no contexto de que o software está sendo contruido, permitindo melhor legebilidade, codigo reutilizavél e com uma manutenção objetvia que e que não afeta outras partes do código. A programação orientada a objeto é composta por pilares, que nos guiam durante a contrução de uma aplicação, esses pilares são: 

- Abstração
- Encapsulamento
- Herança
- Polimorfismo

![alt](https://images.pexels.com/photos/37880001/pexels-photo-37880001.jpeg)


## 1. Abstração 
---

Abstração é o princípio da Programação Orientada a Objetos que consiste em representar apenas as características e comportamentos essenciais de um objeto(real ou conceitual), ocultando detalhes desnecessários de sua implementação. O pila da abstração utilizamos de forma constante e intensa, pois utilizamos ele em diversas etapas da modelagem e desenvolvimento de software. Vamos imaginar o seguinte cenário, vamos criar um programa que irá cadastrar produtos de loja de varejo, a mesma possui diverços tipos de produtos como: eletrodomésticos, móveis, eletrônicos, etc. Todos são produtos, e compartilham caracteristicas, vamos reunir essas caractiristicas para criar nosso produto, nesse exemplo 

Exemplo de abstrção de objeto usando pseudo codigo:

```text  

classe Produto{
	texto marca; 
	texto modelo;
	texto descricao; 
	decimal peso;
	
}



```

Exemplo de abstração utilizando a linguagem Java:
```java
public class Produto{
	public String marca;
	public String modelo;
	public String descricao;
	public double peso;

}


```
