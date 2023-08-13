package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	rand.Seed(time.Now().UnixNano())

	// Lista de membros
	membros := []string{
		"Membro1",
		"Membro2",
		"Membro3",
		"Membro4",
		"Membro5",
		"Membro6",
		"Membro7",
		"Membro8",
		"Membro9",
		"Membro10",
		// Adicione mais membros, se necessário
	}

	// Embaralhar a lista de membros
	rand.Shuffle(len(membros), func(i, j int) {
		membros[i], membros[j] = membros[j], membros[i]
	})

	// Dividir os membros em times de 5 membros cada
	numTimes := len(membros) / 5
	times := make([][]string, numTimes)

	for i := 0; i < numTimes; i++ {
		startIndex := i * 5
		endIndex := startIndex + 5
		times[i] = membros[startIndex:endIndex]
	}

	// Imprimir os times sorteados
	for i, time := range times {
		fmt.Printf("Time %d: %v\n", i+1, time)
	}
}
