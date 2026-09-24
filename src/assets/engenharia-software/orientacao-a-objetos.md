# Orientação a Objetos
---

description: Construção de sistemas com a orientação a objetos
tags: arquitetura de software, programação, oop
date: 2026-09-23 23:00:00

## Origem do POO

Objetivo ⇒ Criar uma maior aproximação do mundo digital com o mundo real. 

**Como era?** Programação de Baixo Nível ( Binário, Hexadecimal) → Programação Linear: Códigos mais próximos da linguagem humana, os comando eram similares a uma listagem → Programação Estruturada: Bloco mais elaborados de código, dando novas possibilidades no processo de criação de programas. → Programação Modular: Era baseada em modulo que ficavam contidas em capsulas que a protegiam, ela permitia a criação de sistemas maiores. → POO: Criada por Alan Kay (Matemático e Biólogo), utilizando a lógica que obteve na matemática somados aos seus conhecimentos obtidos em biologia permitiu que ele desenvolvesse conceitos de programação que a tornaria mais natural.  Durante um projeto de dispositivo chamado Dynabook, porém Kay teve que  desenvolver uma linguagem de programação para esse dispositivo, pois em sua ideia ele deveria ser um dispositivo dinâmico, ele queria tratá-las como objetos, assim surgiu a linguagem Smalltalk, que continha conceitos até hoje empregados na programação orientada a objeto. ( O projeto não saiu de sua versão protótipo) Porém possibilitou grandes avanços na programação, avanços esses que deram suporte a tecnologias que temos nos dias de hoje. A programação nessa época os dados eram tratados de forma global e eram acessados por procedimentos e assim processados, posteriormente gerando resultados, nesse formato muitos procedimentos não faziam uso de todos os dados globais criados, tornando a aplicação lenta e ineficiente. 

---

**Como ficou?** Com o formato proposto por Alan Kay os dados seriam tratados como objetos os quais teriam métodos que iriam realizar seu acesso e processariam esses dados gerando assim seus resultados.  Esse formato possibilitava uma melhor utilização dos dados pois não iria ter a necessidade de filtros, e sim a criação de novos objetos, os quais poderiam realizar a troca de dados entre si.

Exemplos: 

Programar um controle remoto

Linguagem não OO ⇒  Foco nos circuitos internos, de forma detalhada, para que todas as funcionalidades operem corretamente; 

Linguagem OO ⇒ Foco seria nas funcionalidades dos botões e as ações que poderiam ser criadas


**O que é um Objeto ?** Dentro do POO, objeto é tudo aquilo material ou abstrato que pode ser descrito por suas características, comportamentos e estado. 
    
Exemplo: 

Caneta

Dentro do POO representamos um objeto através de uma classe.

```pseudo
classe Caneta {
	var modelo: Caractere;
	var cor : Caractere;
	var ponta: Real; 
	var carga: Inteiro
	var tampada: Logico; 

	funcao rabiscar(){
		Se(tampada) entao{
			Escreva("Erro!!")
		}senao{
			Escreva("Rabisco...")
		}  		
	}

	funcao tampar(){
		tampada = verdadeiro
	} 
}
```

Como instanciar um novo objeto:

```pseudo
	c1 = nova Caneta 
	c1.cor = "Azul"
	c1.ponta = 0.5
	c1.tampada = Falso
	c1.rabiscar()  

	c2 = nova Caneta 
	c2.cor = "Vermelha"
	c2.ponta = 1.0
	c2.tampada = Falso
	c2.tampar()  
```

Dentro do POO podemos criar quantos objetos nossa aplicação necessitar obedecendo aos atributos e métodos da classe a qual ele pertence. 

CLASSE = OBJETO 

Podemos dizer que uma classe é um molde para nosso objeto, ou seja, serve como base para que possamos criar nosso objeto durante o desenvolvimento de nossa aplicação. 


A programação orientada a objeto é composta por 4 pilares, que nos guiam durante a contrução de uma aplicação, esses pilares são: 

- Abstração
- Encapsulamento
- Herança
- Polimorfismo

![alt](https://images.pexels.com/photos/37880001/pexels-photo-37880001.jpeg)


## 1. Abstração 
---

Abstração é o princípio da Programação Orientada a Objetos que consiste em representar apenas as características e comportamentos essenciais de um objeto (real ou conceitual), ocultando detalhes desnecessários de sua implementação. O pilar da abstração utilizamos de forma constante e intensa, pois utilizamos ele em diversas etapas da modelagem e desenvolvimento de software. Vamos imaginar o seguinte cenário, vamos criar um programa que irá cadastrar produtos de uma loja de varejo, que possui diversos tipos de produtos como: eletrodomésticos, móveis, eletrônicos, etc. Todos são produtos, e compartilham características, vamos reunir essas características para criar nosso produto, nesse exemplo 

Exemplo de abstração de objeto usando pseudocódigo:

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

## 2. Encapsulamento 
---

Objetos no POO são representações de estado, ou seja, eles dizem como o objeto é conforme seus atributos. Quando um atributo é modificado — seja por um novo valor sendo informado diretamente, seja por um método que executa uma tarefa e altera os valores dos atributos — temos uma mudança no estado do objeto.

Encapsulamento é o princípio da Programação Orientada a Objetos que consiste em proteger os dados de um objeto, restringindo o acesso direto aos seus atributos e permitindo que essa manipulação aconteça apenas através de métodos controlados, geralmente chamados de *getters* e *setters*. Isso evita que qualquer parte do sistema altere o estado de um objeto de forma indevida, além de permitir validações antes de um dado ser realmente alterado. Vamos voltar ao exemplo da nossa `Caneta`: até agora seus atributos eram acessados livremente (`c1.tampada = Falso`), mas nada impedia que algum trecho do código deixasse a caneta num estado inválido, como uma `carga` negativa. Com encapsulamento, tornamos os atributos privados e criamos métodos para controlar esse acesso.

Exemplo de encapsulamento usando pseudocódigo:

```pseudo
classe Caneta {
	privado var carga: Inteiro;
	privado var tampada: Logico;

	funcao pegarCarga(){
		retorne carga
	}

	funcao definirCarga(novaCarga){
		Se(novaCarga >= 0) entao{
			carga = novaCarga
		}senao{
			Escreva("Erro! Carga não pode ser negativa.")
		}
	}

	funcao tampar(){
		tampada = verdadeiro
	}
}
```

Exemplo de encapsulamento utilizando a linguagem Java:

```java
public class Caneta {
	private int carga;
	private boolean tampada;

	public int getCarga() {
		return carga;
	}

	public void setCarga(int carga) {
		if (carga >= 0) {
			this.carga = carga;
		} else {
			System.out.println("Erro! Carga não pode ser negativa.");
		}
	}

	public void tampar() {
		this.tampada = true;
	}
}
```

Repare que quem for usar a classe `Caneta` não consegue mais alterar `carga` diretamente, precisa passar pelo método `setCarga()`, que garante que a regra (carga nunca negativa) seja respeitada.

## 3. Herança 
---

Herança é o princípio da Programação Orientada a Objetos que permite que uma classe reaproveite atributos e comportamentos já definidos em outra classe, criando uma relação de especialização entre elas. A classe que é reaproveitada chamamos de superclasse (ou classe pai), e a que reaproveita chamamos de subclasse (ou classe filha). Voltando ao exemplo da loja de varejo que criamos lá na Abstração: já temos a classe `Produto`, com os atributos comuns a qualquer produto (marca, modelo, descrição, peso). Só que um eletrodoméstico tem características próprias, como a voltagem, que não fazem sentido para outros tipos de produto. Em vez de criar uma classe do zero repetindo marca, modelo, descrição e peso, criamos `Eletrodomestico` herdando de `Produto`.

Exemplo de herança usando pseudocódigo:

```pseudo
classe Produto {
	var marca: Caractere;
	var modelo: Caractere;
	var descricao: Caractere;
	var peso: Real;
}

classe Eletrodomestico herda Produto {
	var voltagem: Inteiro;
}
```

Exemplo de herança utilizando a linguagem Java:

```java
public class Produto {
	public String marca;
	public String modelo;
	public String descricao;
	public double peso;
}

public class Eletrodomestico extends Produto {
	public int voltagem;
}
```

Ao instanciar um `Eletrodomestico`, ele já nasce com `marca`, `modelo`, `descricao` e `peso`, herdados de `Produto`, além do seu próprio atributo `voltagem`.

## 4. Polimorfismo 
---

Polimorfismo é o princípio da Programação Orientada a Objetos que permite que um mesmo método se comporte de forma diferente dependendo do objeto que o executa. Existem duas formas principais de aplicar polimorfismo: a sobrescrita (quando uma subclasse redefine um método herdado da superclasse) e a sobrecarga (quando criamos métodos com o mesmo nome, mas parâmetros diferentes, dentro da mesma classe). Seguindo o exemplo da loja de varejo, tanto `Eletrodomestico` quanto `Movel` são um `Produto`, mas a forma de calcular a garantia de cada um é diferente. Com polimorfismo, cada subclasse implementa a sua própria versão do método `calcularGarantia()`.

Exemplo de sobrescrita usando pseudocódigo:

```pseudo
classe Produto {
	funcao calcularGarantia(){
		retorne 90
	}
}

classe Eletrodomestico herda Produto {
	funcao calcularGarantia(){
		retorne 365
	}
}

classe Movel herda Produto {
	funcao calcularGarantia(){
		retorne 180
	}
}
```

Exemplo de sobrescrita utilizando a linguagem Java:

```java
public class Produto {
	public int calcularGarantia() {
		return 90;
	}
}

public class Eletrodomestico extends Produto {
	@Override
	public int calcularGarantia() {
		return 365;
	}
}

public class Movel extends Produto {
	@Override
	public int calcularGarantia() {
		return 180;
	}
}
```

Já na sobrecarga, o nome do método se repete, mas a assinatura muda:

```java
public double calcularDesconto(double valor) {
	return valor * 0.9;
}

public double calcularDesconto(double valor, double cupom) {
	return (valor * 0.9) - cupom;
}
```

Em ambos os casos, quem chama o método (`produto.calcularGarantia()` ou `calcularDesconto(...)`) não precisa saber qual implementação vai rodar — isso é resolvido automaticamente pela linguagem, seja pelo tipo real do objeto (sobrescrita), seja pelos parâmetros passados (sobrecarga).
