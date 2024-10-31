# Miau

## Requisitos funcionais
[] Deve ser possível cadastrar um tutor</br>
[] Deve ser possível cadastrar um veterinário</br>
[] Deve ser possível cadastrar um animal</br>
[] Deve ser possível que o tutor solicite uma consulta em um determinado dia e enviando três horários de disponibilidade</br>
[] Deve ser possível que o veterinário aceite ou recuse uma solicitação de consulta, dando uma justificativa para a recusa.</br>
[] Deve ser possível que o veterinário visualize todas as consultas solicitadas para ele.</br>
[] Deve ser possível que o veterinário visualzie todas as suas consultas em andamento.</br>
[] Deve ser possível que o veterinário visualize todas as consultas finalizadas.</br>
[] O tutor pode cadastrar seus próprios animais</br>

## Regras de negócio
[] Um veterinário só pode ser cadastrado pelo admin</br>
[] O tutor pode se cadastrar</br>
[] O veterinário pode cadastrar novos tutores e animais, mas não pode excluí-los.</br>
[] Somente o admin pode excluir tutores, veterinários e animais.</br>
[] O tutor deve sugerir até 3 horários ao solicitar uma consulta.</br>
[] O veterinário pode aceitar um recusar uma solicitação de consulta, com justificativa predefinida ou personalizada.</br>
[] O veterinário deve marcar uma consulta como finalizada e adicionar observações.</br>
[] O tutor pode visualizar apenas suas consultas e as de seus animais.</br>
[] O acesso ao sistema é baseado em roles (ADMIN, TUTOR, VETERINARIO)</br>
[] O veterinário e o tutor podem editar seus próprios dados e animais, mas não podem excluir.</br>
[] O admin tem acesso total e pode realizar qualquer operação no sistema.</br>
[] Cada usuário pode visualizar apenas suas próprias informações e as entidades associadas.</br>
[] O tutor é responsável por cadastrar e gerenciar seus próprios animais.</br>
[] Se um animal for excluído, ele deve ser marcado como inativo para manter o histórico de consultas.</br>
[] O veterinário pode editar as informações de qualquer animal.</br>

## Rotas
[] POST /owners</br>
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
