import { ActionIcon, NumberInput, Table, TextInput } from '@mantine/core'
import { randomId } from '@mantine/hooks'
import { Plus, Trash } from 'lucide-react';
import React from 'react'

const PeerRecognitionAwardsComponent = ({form}) => {
  return (
    <div className='rounded-sm'>
    <Table striped highlightOnHover withColumnBorders withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Awards / Honors</Table.Th>
                    <Table.Th>Awards / Honors Body</Table.Th>
                    <Table.Th>Year of Awarded</Table.Th>
                    <Table.Th>Details</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                        {
                            form.getValues().peerRecognitionAwards.map((item,index)=>{
                                return <Table.Tr key={index}>
                                    <Table.Td>
                                        <TextInput size="xs"
                                        style={{ flex: 1 }}
                                        placeholder=""
                                        key={form.key(`peerRecognitionAwards.${index}.awardName`)}
                                        {...form.getInputProps(`peerRecognitionAwards.${index}.awardName`)}
                                        />
                                    </Table.Td>
                                    <Table.Td>
                                        <TextInput size="xs"
                                        
                                        key={form.key(`peerRecognitionAwards.${index}.awardingBody`)}
                                        placeholder=""
                                        {...form.getInputProps(`peerRecognitionAwards.${index}.awardingBody`)}
                                        /> 
                                    </Table.Td>
                                    <Table.Td>
                                        <NumberInput size='xs'
                                        hideControls
                                        key={form.key(`peerRecognitionAwards.${index}.yearAwarded`)}
                                        placeholder=""
                                        {...form.getInputProps(`peerRecognitionAwards.${index}.yearAwarded`)}
                                        /> 
                                    </Table.Td>
                                     <Table.Td>
                                        <TextInput size="xs"
                                        key={form.key(`peerRecognitionAwards.${index}.details`)}
                                        placeholder=""
                                        {...form.getInputProps(`peerRecognitionAwards.${index}.details`)}
                                        /> 
                                    </Table.Td>
                                    <Table.Td>
                                        {
                                            index < (form.getValues().peerRecognitionAwards.length - 1) &&  <ActionIcon color="red" 
                                        
                                            onClick={() => form.removeListItem('peerRecognitionAwards', index)}>
                                                <Trash size="1rem" />
                                            </ActionIcon>
                                        }

                                        {
                                            index == (form.getValues().peerRecognitionAwards.length - 1) &&  <ActionIcon size="lg"  variant='outline' 
                                            
                                            onClick={() =>{
                                                form.insertListItem('peerRecognitionAwards', {
                                                    awardId: 0,
                                                    candidateId: 0,
                                                    awardName: "",
                                                    awardingBody: "",
                                                    yearAwarded: 0,
                                                    details: ""
                                                })
                                            }}
                                            radius={'sm'}  aria-label="Has disabled styles but still interactive">
                                                    <Plus />
                                                </ActionIcon>
                                        }
                                    
                                    
                                
                                    </Table.Td>
                                </Table.Tr>
                            })
                        }
            </Table.Tbody>
            </Table>
        </div>
  )
}

export default PeerRecognitionAwardsComponent
