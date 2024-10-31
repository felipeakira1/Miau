# Miau

## Requisitos funcionais
[] Deve ser possível cadastrar um tutor
[] Deve ser possível cadastrar um veterinário
[] Deve ser possível cadastrar um animal
[] Deve ser possível que o tutor solicite uma consulta em um determinado dia e enviando três horários de disponibilidade
[] Deve ser possível que o veterinário aceite ou recuse uma solicitação de consulta, dando uma justificativa para a recusa.
[] Deve ser possível que o veterinário visualize todas as consultas solicitadas para ele.
[] Deve ser possível que o veterinário visualzie todas as suas consultas em andamento.
[] Deve ser possível que o veterinário visualize todas as consultas finalizadas.
[] O tutor pode cadastrar seus próprios animais

## Regras de negócio
[] Um veterinário só pode ser cadastrado pelo admin
[] O tutor pode se cadastrar
[] O veterinário pode cadastrar novos tutores e animais, mas não pode excluí-los.
[] Somente o admin pode excluir tutores, veterinários e animais.
[] O tutor deve sugerir até 3 horários ao solicitar uma consulta.
[] O veterinário pode aceitar um recusar uma solicitação de consulta, com justificativa predefinida ou personalizada.
[] O veterinário deve marcar uma consulta como finalizada e adicionar observações.
[] O tutor pode visualizar apenas suas consultas e as de seus animais.
[] O acesso ao sistema é baseado em roles (ADMIN, TUTOR, VETERINARIO)
[] O veterinário e o tutor podem editar seus próprios dados e animais, mas não podem excluir.
[] O admin tem acesso total e pode realizar qualquer operação no sistema.
[] Cada usuário pode visualizar apenas suas próprias informações e as entidades associadas.
[] O tutor é responsável por cadastrar e gerenciar seus próprios animais.
[] Se um animal for excluído, ele deve ser marcado como inativo para manter o histórico de consultas.
[] O veterinário pode editar as informações de qualquer animal.

## Rotas
[] POST /owners
[] GET /owners
[] GET /owners/:id
[] PUT /owners/:id
[] DELETE /owner/:id

[] POST /veterinarians
[] GET /veterinarians
[] GET /veterinarians/:id
[] PUT /veterinarians/:id
[] DELETE /veterinarians/:id

[] POST /animals
[] GET /animals
[] GET /animals/:ownerId/animals
[] GET /animals/:id
[] PUT /animals/:id
[] DELETE /animals/:id

[] POST /appointments
[] GET /appointments
[] GET /appointments/:id
[] PUT /appointments/:id/accept
[] PUT /appointments/:id/suggest-date
[] PUT /appointments/:id/respond-suggestion
[] PUT /appointments/:id/complete
[] GET /appointments/:ownerId/appointments
[] GET /appointments/:veterinarianId/appointments
[] GET /appointments/:animalId/appointments

## Fluxo
1. Tutor solicita uma consulta, enviando três horários preferenciais
2. Veterinario aceita um dos horários via PUT /appointments/:id/accept
3. Se o veterinario não puder nos horários sugeridos, ele sugere um novo horário via PUT /appointments/suggest-date
4. Tutor aceita via PUT /appointments/:id/accept
