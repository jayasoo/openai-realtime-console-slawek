export const build_instructions = `System settings:
Tool use: enabled.

Instructions:
- You are "Instabase AiHub" assistant. "Instabase" is an AI startup that provides a platform for automating document processing. The CEO is Anant Bhardwaj.
- You are an artificial intelligence agent responsible for answering user questions about the provided documents and creating pipelines to extract information out of them.
- The tool calls can take a while to process, before calling any tool, please let the user know
- Please make sure to respond with a helpful voice via audio
- Be kind, helpful, and curteous
- It is okay to ask the user questions
- Use tools and functions you have available liberally.
- Be open to exploration and conversation
- Remember: this is just for fun and testing!

Personality:
- Be upbeat and genuine
- Try speaking quickly as if excited

User:
- You are interacting with Sławek Biel, a machine learning engineer who is testing the system

Documents you have accees to:
- 'Alabama 1.jpg' - A driver license of a person named 'Connor Sample'
- 'Alabama 2.jpg' - A driver license of a person named 'Bogus Middle Braxtor'

`;

export const read_document_tool_definition = 
    {
      name: 'read_document',
      description: 'Gets the full text content of a document',
      parameters: {
        type: 'object',
        properties: {
          file_name: {
            type: 'string',
            description:
              'File name of the document',
          },
        },
        required: ['file_name'],
      },
    }

export const add_fields_tool_definition =
{
    name: 'add_fields',
    description: 'Adds fields to the extraction app. This will be applied to all the documents.',
    parameters: {
      type: 'object',
      properties: {
        field_names: {
          type: 'array',
            items: {
                type: 'string',
            },
          description:
            'Name of the fields to add',
        },
      },
      required: ['field_names'],
    },
  }


export const read_document_tool_hander = async ({ file_name }: { [key: string]: any }) => {
    if (file_name === 'Alabama 1.jpg') return `
                              DRIVER      LICENSE
     SAMPLES                      ALABAMA
                                    NO.1234567                CLASS D
                               D.O.B.03-21-1968           IEXP 03-21-2010
                              CONNOR
                              SAMPLES
                               1 WONDERFUL     DRIVE
                              MONTGOMERY       AL 36104-1234
                               ENDORSEMENTS            RESTRICTIONS   A
                              Iss 03-21-2009           SEX F   HT 5-05   EYES BLU
                                                               WT 120    HAIR BRO
     Colonel Hugh B. McCall    Connor          Sample.
     Director of Public Safety                                          ETERAN
    `;
    else if (file_name === 'Alabama 2.jpg') return `                  DRIVER   LICENSE
        ALABAMA
        NO.4701457        CLASSD
    0.0.8.08-09-1995    JEXP08-09-2023
    BOGUS  MIDDLE
    BRAXTOR
    561RIVERWOODS LOG
    HELENA AL 35080-3490
    ENDOR   EATS      REST
    SE(3.05-2019     SEXM HT5-10 FRESBLU
    SecretaryHil Taylor bogus   braxton       WE 150 HARBLK`;
    else return `Document ${file_name} not found`;
    }

export const add_fields_tool_hander = async ({ field_names }: { [key: string]: any }) => {
    return `Fields added: ${field_names.join(', ')}`;
}