# Miau

## Requisitos funcionais
### Autenticação
[] Deve ser possível se autenticar como admin</br>
[X] Deve ser possível se autenticar como tutor</br>
[X] Deve ser possível se autenticar como veterinario</br>

### Animais
[X] Deve ser possível cadastrar um animal</br>
[] Deve ser possível atualizar os dados de um animal</br>
[] Deve ser possível excluir um animal</br>
[X] Deve ser possível visualizar todos os animais do sistema</br>
[X] Deve ser possível visualizar todos os animais de um tutor</br>

### Tutores
[X] Deve ser possível cadastrar um tutor</br>
[] Deve ser possível atualizar os dados de um tutor</br>
[] Deve ser possível excluir um tutor</br>
[] Deve ser possível visualizar todos os tutores do sistema</br>

### Veterinario
[X] Deve ser possível cadastrar um veterinário</br>
[] Deve ser possível atualizar os dados de um veterinário</br>
[] Deve ser possível excluir um veterinário</br>

### Consultas
[X] Deve ser possível que o tutor solicite uma consulta em um determinado dia e enviando três horários de disponibilidade</br>
[X] Deve ser possível que o veterinário aceite uma solicitação de consulta</br>
[X] Deve ser possível que o veterinário recuse uma solicitação de consulta, dando uma justificativa para a recusa.</br>
[X] Deve ser possível que o veterinário finalize uma consulta</br>
[] Deve ser possível que o tutor cancele uma solicitação de consulta</br>
[] Deve ser possível que o tutor cancele uma consulta</br>
[X] Deve ser possível que o veterinário visualize todas as consultas solicitadas para ele.</br>
[] Deve ser possível que o veterinário visualize todas as suas consultas em andamento.</br>
[] Deve ser possível que o veterinário visualize todas as consultas finalizadas.</br>

## Regras de negócio
[] Somente o ADMIN pode cadastrar veterinarios</br>
[] O tutor pode se cadastrar</br>
[] Somente o ADMIN pode excluir tutores, veterinários e animais</br>
[] Se um animal for excluído, ele deve ser marcado como inativo para manter o histórico de consultas

[] O tutor pode editar seus próprios dados e os de seus animais</br>
[] O veterinário pode editar suas próprias informações</br>
[] O veterinário pode editar as informações de qualquer animal e tutor</br>

[X] O tutor deve sugerir até 3 horários ao solicitar uma consulta.</br>
[] O veterinário pode aceitar um recusar uma solicitação de consulta, com justificativa predefinida ou personalizada.</br>
[] O veterinário deve marcar uma consulta como finalizada e adicionar observações.</br>
[] O tutor pode visualizar apenas suas consultas e as de seus animais.</br>
[X] O acesso ao sistema é baseado em roles (ADMIN, TUTOR, VETERINARIO)</br>
[] O admin tem acesso total e pode realizar qualquer operação no sistema.</br>

## Rotas
[X] POST /authenticate - Autenticação</br>
[X] POST /owners - Registrar um tutor</br>
[] GET /owners</br>
[] GET /owners/:id</br>
[] PUT /owners/:id</br>
[] DELETE /owner/:id</br>

[] POST /veterinarians</br>
[] GET /veterinarians</br>
[] GET /veterinarians/:id</br>
[] PUT /veterinarians/:id</br>
[] DELETE /veterinarians/:id</br>

[] POST /animals</br>
[] GET /animals</br>
[] GET /animals/:ownerId/animals</br>
[] GET /animals/:id</br>
[] PUT /animals/:id</br>
[] DELETE /animals/:id</br>

[] POST /appointments</br>
[] GET /appointments</br>
[] GET /appointments/:id</br>
[] PUT /appointments/:id/accept</br>
[] PUT /appointments/:id/suggest-date</br>
[] PUT /appointments/:id/respond-suggestion</br>
[] PUT /appointments/:id/complete</br>
[] GET /appointments/:ownerId/appointments</br>
[] GET /appointments/:veterinarianId/appointments</br>
[] GET /appointments/:animalId/appointments</br>

## Fluxo
1. Tutor solicita uma consulta, enviando três horários preferenciais
2. Veterinario aceita um dos horários via PUT /appointments/:id/accept
3. Se o veterinario não puder nos horários sugeridos, ele sugere um novo horário via PUT /appointments/suggest-date
4. Tutor aceita via PUT /appointments/:id/accept
