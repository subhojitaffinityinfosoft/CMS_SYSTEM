import { ActionIcon, Button, NumberInput, Select, Table, Textarea } from '@mantine/core'
// import { DateInput } from '@mantine/dates'
import { randomId } from '@mantine/hooks'
import { Plus, Trash } from 'lucide-react';
import MNTextInputComponent from '../ux/MNTextInput';

const FellowShipComponent = ({form,md_fellowship,isDisabled=false}) => {
  return (
    <div className='p-5 rounded-sm'>
    <Table  striped highlightOnHover withRowBorders withColumnBorders withTableBorder>
        <Table.Thead>
            <Table.Tr>
                <Table.Th>Fellowship Detail</Table.Th>
                <Table.Th>Year</Table.Th>
                <Table.Th>Amount Per annum	</Table.Th>
                <Table.Th>Fellowship Status</Table.Th>
            </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
                    {
                        form.getValues().fellowShipsArchived.map((item,index)=>{
                            return <Table.Tr key={index}>
                                <Table.Td>
                                    <Textarea disabled={isDisabled}
                                    size='xs'
                                    style={{ flex: 1 }}
                                    placeholder="Enter Fellowship Details"
                                    key={form.key(`fellowShipsArchived.${index}.fellowshipDetail`)}
                                    {...form.getInputProps(`fellowShipsArchived.${index}.fellowshipDetail`)}
                                    />
                                </Table.Td>
                                <Table.Td>
                                    
                                      <MNTextInputComponent size='xs'
                                        // label={'Year'}
                                        isDisabled={isDisabled}
                                        placeholder="Enter Year"
                                        form={form}
                                        type={'text'}
                                         formKey={`fellowShipsArchived.${index}.year`}
                                        //  {...form.getInputProps(`fellowShipsArchived.${index}.year`)}
                                        withAsterik={false}
                                    />
                                {/* <NumberInput
                                    size='xs'
                                    placeholder="Enter Year"
                                    hideControls
                                    key={form.key(`fellowShipsArchived.${index}.year`)}
                                    {...form.getInputProps(`fellowShipsArchived.${index}.year`)}
                                    /> */}
                                </Table.Td>
                                <Table.Td>
                                     <MNTextInputComponent size='xs'
                                        // label={'Amount Per annum'}
                                        form={form} 
                                        isDisabled={isDisabled}
                                         formKey={`fellowShipsArchived.${index}.amountPerAnnum`}
                                        //  {...form.getInputProps(`fellowShipsArchived.${index}.amountPerAnnum`)}

                                        withAsterik={false}
                                    />
                                  
                                {/* <NumberInput
                                    size='xs'
                                    placeholder="Enter Amount Per annum	"
                                    hideControls
                                    key={form.key(`fellowShipsArchived.${index}.amountPerAnnum`)}
                                    {...form.getInputProps(`fellowShipsArchived.${index}.amountPerAnnum`)}
                                    /> */}
                                </Table.Td>
                               
                                <Table.Td>
                                    <Select
                                    size='xs'
                                    clearable={!isDisabled} disabled={isDisabled}
                                    searchable
                                    nothingFoundMessage="Nothing found..."
                                    checkIconPosition="right"
                                    data={md_fellowship?.map(el => {return {value:el.fellowshipStatusName,label:el.fellowshipStatusName}})}
                                    key={form.key(`fellowShipsArchived.${index}.fellowshipStatus`)}
                                    placeholder="Select Status"
                                    {...form.getInputProps(`fellowShipsArchived.${index}.fellowshipStatus`)}
                                    /> 
                                </Table.Td>
                                {!isDisabled && <Table.Td>
                                    {
                                        index < (form.getValues().fellowShipsArchived.length - 1) &&  <Button size='xs' color="red" 
                                    
                                        onClick={() => form.removeListItem('fellowShipsArchived', index)}>
                                            <Trash size="1rem" /> &nbsp;Delete
                                        </Button>
                                    }

                                    {
                                        index == (form.getValues().fellowShipsArchived.length - 1) &&  <Button size="xs"  variant='outline' 

                                        onClick={() =>{
                                            form.insertListItem('fellowShipsArchived', {    
                                                fellowshipDetail:'',
                                                year:"",
                                                amountPerAnnum:"",
                                                fellowshipStatus:'',})
                                        }}
                                        radius={'sm'}  aria-label="Has disabled styles but still interactive">
                                                <Plus />&nbsp;Add
                                            </Button>
                                    }
                                
                                
                            
                                </Table.Td>}
                            </Table.Tr>
                        })
                    }
        </Table.Tbody>
     </Table>
</div>
  )
}

export default FellowShipComponent
